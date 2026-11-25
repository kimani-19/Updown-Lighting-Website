const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { fetchGoogleReviews } = require('./googleReviews');
const {
  authorizeAdmin,
  createAdminSupabaseClient,
} = require('./adminAuth');

// Load env from either `server/.env` (recommended for local dev)
// or from the repository root `.env` (common for process managers / hosting).
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the React production build only in production.
// In development, the React dev server (port 3000) serves the frontend.
const clientBuildPath = path.join(__dirname, '../client/build');
if (process.env.NODE_ENV === 'production' && fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
}

// Google Reviews Route
app.get('/api/reviews', async (req, res) => {
  const apiKey = process.env.API_KEY;
  const placeId = process.env.PLACE_ID;

  if (!apiKey || !placeId) {
    console.error('Server configuration error: API_KEY or PLACE_ID is missing.');
    return res.status(500).json({ error: 'API key or Place ID is not configured on the server.' });
  }

  try {
    const reviewData = await fetchGoogleReviews({ apiKey, placeId });
    return res.json(reviewData);
  } catch (error) {
    console.error('Error fetching Google reviews:', error.message);
    const details = error.response ? error.response.data : error.message;
    return res.status(500).json({ error: 'Failed to fetch reviews from Google.', details });
  }
});

// Database setup
const supabase = createAdminSupabaseClient();

async function requireAdmin(req, res, next) {
  const authorization = await authorizeAdmin(
    supabase,
    req.headers.authorization
  );
  if (!authorization.user) {
    return res.status(authorization.status).json({ error: authorization.error });
  }

  req.adminUser = authorization.user;
  return next();
}

app.get('/api/admin/session', requireAdmin, (req, res) => {
  res.json({
    authenticated: true,
    email: req.adminUser.email,
  });
});

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[character]));

// Routes

// Get all quotes
app.get('/api/quotes', requireAdmin, async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase is not configured on the server.' });
  }

  const { data, error } = await supabase
    .from('quote_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Submit quote
const submitQuote = async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase is not configured on the server.' });
  }

  const full_name = String(req.body.full_name ?? '').trim();
  const email_address = String(req.body.email_address ?? '').trim();
  const phone_number = String(req.body.phone_number ?? '').trim();
  const property_address = String(req.body.property_address ?? '').trim();
  const service_type = String(req.body.service_type ?? '').trim();
  const additional_details = String(req.body.additional_details ?? '').trim();

  const allowedServices = [
    'Residential Installation',
    'Maintenance and Removal',
    'Custom Design',
    'Consultation Only',
  ];
  const invalid =
    !full_name ||
    !email_address ||
    !phone_number ||
    !property_address ||
    !allowedServices.includes(service_type) ||
    full_name.length > 150 ||
    email_address.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_address) ||
    phone_number.length > 30 ||
    property_address.length > 500 ||
    additional_details.length > 3000;

  if (invalid) {
    return res.status(400).json({ error: 'Please check your form information.' });
  }

  let data;
  try {
    const result = await supabase
      .from('quote_requests')
      .insert([{
        full_name,
        email_address,
        phone_number,
        property_address,
        service_type,
        additional_details,
      }])
      .select()
      .single();

    if (result.error) {
      console.error('Supabase quote error:', result.error);
      return res.status(500).json({ error: 'Unable to process your request.' });
    }

    data = result.data;
  } catch (error) {
    console.error('Quote API error:', error);
    return res.status(500).json({ error: 'Unable to process your request.' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email_address,
    subject: 'New Quote Request - Up-Down-Lighting',
    text: [
      'New Quote Request',
      `Name: ${full_name}`,
      `Email: ${email_address}`,
      `Phone: ${phone_number}`,
      `Address: ${property_address}`,
      `Service Type: ${service_type}`,
      `Additional Details: ${additional_details || 'None provided'}`,
    ].join('\n'),
    html: `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(full_name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email_address)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone_number)}</p>
      <p><strong>Address:</strong> ${escapeHtml(property_address)}</p>
      <p><strong>Service Type:</strong> ${escapeHtml(service_type)}</p>
      <p><strong>Additional Details:</strong><br>${escapeHtml(additional_details || 'None provided').replace(/\n/g, '<br>')}</p>
    `,
  };

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Quote notification email skipped: EMAIL_USER or EMAIL_PASS is not configured.');
  } else {
    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Quote notification email failed:', emailError);
    }
  }

  res.status(201).json({
    id: data.id,
    message: 'Quotation request submitted!',
  });
};

app.post('/api/quote', submitQuote);
app.post('/api/quotes', submitQuote);

// Get all contact messages
app.get('/api/contact', requireAdmin, async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase is not configured on the server.' });
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
 
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Submit contact message
app.post('/api/contact', async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase is not configured on the server.' });
  }

  const { name, email, subject, message } = req.body;

  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{ name, email, subject, message }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Contact Form: ${subject}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  transporter.sendMail(mailOptions, (emailError, info) => {
    if (emailError) {
      console.log('Email error:', emailError);
    } else {
      console.log('Email sent:', info.response);
    }
  });

  res.status(201).json({
    id: data.id,
    message: 'Message sent successfully',
  });
});

// Get gallery images
app.get('/api/gallery', async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase is not configured on the server.' });
  }

  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Add gallery image (admin only)
app.post('/api/gallery', requireAdmin, async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase is not configured on the server.' });
  }

  const { title, description, image_url, category } = req.body;

  const { data, error } = await supabase
    .from('gallery_images')
    .insert([{ title, description, image_url, category }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({
    id: data.id,
    message: 'Image added successfully',
  });
});

// Chatbot endpoint
app.post('/api/chatbot', (req, res) => {
  const message = String(req.body?.message || '').trim();

  if (!message) {
    return res.status(400).json({ error: 'Please enter a message.' });
  }

  if (message.length > 500) {
    return res.status(400).json({ error: 'Please keep your message under 500 characters.' });
  }
  
  const lowerMessage = message.toLowerCase();
  const intents = [
    {
      terms: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
      response: 'Hello! Welcome to Up-Down-Lighting. How can I help with your holiday lighting project?'
    },
    {
      terms: ['price', 'cost', 'pricing', 'how much', 'budget', 'afford'],
      response: 'Pricing depends on property size, roof access, design, materials, and maintenance needs. Use our free quote form for a personalized estimate.'
    },
    {
      terms: ['quote', 'estimate', 'proposal', 'bid'],
      response: 'You can request a free, no-obligation quote through the Get a Free Quote form on this website.'
    },
    {
      terms: ['service', 'services', 'what do you do', 'offer'],
      response: 'We provide residential and commercial Christmas light installation, custom design, maintenance, take-down, and storage support.'
    },
    {
      terms: ['installation', 'install', 'hang', 'put up', 'setup'],
      response: 'Our team provides professional seasonal installation using secure, weather-resistant mounting and materials.'
    },
    {
      terms: ['removal', 'take down', 'takedown', 'remove', 'disassemble'],
      response: 'Yes, we provide professional post-season removal and cleanup. We can also help plan storage for the lights.'
    },
    {
      terms: ['maintenance', 'repair', 'bulb', 'out', 'fix', 'problem'],
      response: 'We offer maintenance throughout the season, including bulb, timer, connection, and weather-related repairs.'
    },
    {
      terms: ['custom', 'design', 'layout', 'look', 'idea'],
      response: 'We create custom designs based on your property, preferred colors, rooflines, landscaping, and holiday style.'
    },
    {
      terms: ['commercial', 'business', 'store', 'office'],
      response: 'Yes, we install holiday lighting for homes and commercial properties. A quote form helps us assess the project size.'
    },
    {
      terms: ['residential', 'house', 'home', 'roof', 'yard'],
      response: 'We install Christmas lights on homes, roofs, trees, bushes, walkways, and other residential features.'
    },
    {
      terms: ['light', 'lights', 'bulb', 'led', 'color', 'white', 'warm'],
      response: 'We offer LED and traditional-style options, including warm white and custom color combinations.'
    },
    {
      terms: ['timer', 'smart', 'control', 'schedule', 'automatic'],
      response: 'Timers and automatic controls can be included so your display turns on and off at scheduled times.'
    },
    {
      terms: ['area', 'location', 'where', 'bayport', 'stillwater', 'woodbury', 'lake elmo'],
      response: 'We serve Bayport, Minnesota and surrounding communities within a 25-mile radius, including many Twin Cities East Metro areas.'
    },
    {
      terms: ['availability', 'available', 'schedule', 'appointment', 'book'],
      response: 'Availability varies by season. Request a quote early to reserve installation, maintenance, or removal dates.'
    },
    {
      terms: ['business hours', 'open', 'hours', 'weekend'],
      response: 'Our listed business hours are Monday-Friday 8 AM-6 PM and Saturday-Sunday 9 AM-4 PM.'
    },
    {
      terms: ['phone', 'call', 'telephone', 'number'],
      response: 'You can call Up-Down-Lighting at (651)497-4609.'
    },
    {
      terms: ['email', 'mail', 'e-mail'],
      response: 'You can email Up-Down-Lighting at updownlighting19@gmail.com.'
    },
    {
      terms: ['contact', 'reach', 'get in touch'],
      response: 'Call (651)497-4609, email updownlighting19@gmail.com, or submit the website quote form.'
    },
    {
      terms: ['insured', 'insurance', 'license', 'licensed', 'certified'],
      response: 'Up-Down-Lighting is a professional, licensed and insured service. Ask us if you need documentation for a property or HOA.'
    },
    {
      terms: ['storage', 'store', 'keep'],
      response: 'We can discuss off-season storage options when planning your installation and removal service.'
    },
    {
      terms: ['time', 'how long', 'duration', 'days'],
      response: 'Residential installation times vary with property size and design complexity. Most projects are completed in a few hours.'
    },
    {
      terms: ['thank', 'thanks', 'appreciate'],
      response: 'You are welcome! Let us know if you have another question about holiday lighting.'
    },
    {
      terms: ['bye', 'goodbye', 'see you'],
      response: 'Thank you for contacting Up-Down-Lighting. Have a bright holiday season!'
    }
  ];

  const intent = intents.find(({ terms }) =>
    terms.some((term) => lowerMessage.includes(term))
  );
  const response = intent?.response ||
    'I can help with pricing, quotes, installation, maintenance, removal, service areas, scheduling, or contact details. Please tell me what you need.';

  res.json({ response });
});

// Serve React app (production only)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Server shutting down.');
  process.exit(0);
});
