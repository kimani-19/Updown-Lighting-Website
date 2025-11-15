const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/build')));

// Google Reviews Route
app.get('/api/reviews', async (req, res) => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.PLACE_ID;

  // Enhanced logging to debug environment variables
  console.log(`Attempting to fetch reviews. PLACE_ID loaded: ${!!placeId}, GOOGLE_PLACES_API_KEY loaded: ${!!apiKey}`);

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`;

  if (!apiKey || !placeId) {
    console.error('Server configuration error: GOOGLE_PLACES_API_KEY or PLACE_ID is missing.');
    return res.status(500).json({ error: 'API key or Place ID is not configured on the server.' });
  }

  try {
    const response = await axios.get(url);
    if (response.data.result && response.data.result.reviews) {
      res.json(response.data.result.reviews);
    } else {
      // Log the actual response from Google if it's not what we expect
      console.error('Unexpected response from Google Places API:', response.data);
      res.json([]);
    }
  } catch (error) {
    console.error('Error fetching Google reviews:', error.message);
    res.status(500).json({ error: 'Failed to fetch reviews from Google.' });
  }
});

// Database setup
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  db.serialize(() => {
    // Quotes table
    db.run(`CREATE TABLE IF NOT EXISTS quotes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      service_type TEXT,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Contact messages table
    db.run(`CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Gallery images table
    db.run(`CREATE TABLE IF NOT EXISTS gallery_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      image_url TEXT NOT NULL,
      category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  });
}

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes

// Get all quotes
app.get('/api/quotes', (req, res) => {
  db.all('SELECT * FROM quotes ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Submit quote
app.post('/api/quotes', (req, res) => {
  const { name, email, phone, address, service_type, message } = req.body;
  
  db.run(
    'INSERT INTO quotes (name, email, phone, address, service_type, message) VALUES (?, ?, ?, ?, ?, ?)',
    [name, email, phone, address, service_type, message],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      // Send email notification
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Quote Request - Up-Down-Lighting',
        html: `
          <h2>New Quote Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Address:</strong> ${address || 'Not provided'}</p>
          <p><strong>Service Type:</strong> ${service_type || 'Not specified'}</p>
          <p><strong>Message:</strong> ${message}</p>
        `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Email error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      res.json({ id: this.lastID, message: 'Quote submitted successfully' });
    }
  );
});

// Get all contact messages
app.get('/api/contact', (req, res) => {
  db.all('SELECT * FROM contact_messages ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Submit contact message
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  db.run(
    'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
    [name, email, subject, message],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      // Send email notification
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
        `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Email error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      res.json({ id: this.lastID, message: 'Message sent successfully' });
    }
  );
});

// Get gallery images
app.get('/api/gallery', (req, res) => {
  db.all('SELECT * FROM gallery_images ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add gallery image (admin only)
app.post('/api/gallery', (req, res) => {
  const { title, description, image_url, category } = req.body;
  
  db.run(
    'INSERT INTO gallery_images (title, description, image_url, category) VALUES (?, ?, ?, ?)',
    [title, description, image_url, category],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: 'Image added successfully' });
    }
  );
});

// Chatbot endpoint
app.post('/api/chatbot', (req, res) => {
  const { message } = req.body;
  
  // Simple chatbot responses
  const responses = {
    'hello': 'Hello! Welcome to Up-Down-Lighting. How can I help you with your Christmas lights installation needs?',
    'price': 'Our pricing varies based on the size of your property and type of installation. Contact us for a free quote!',
    'service': 'We provide professional Christmas lights installation services in Bayport, Minnesota and surrounding areas.',
    'contact': 'You can reach us at (651)497-4609 or email us at updownlighting19@gmail.com',
    'area': 'We serve Bayport, Minnesota and surrounding areas within a 25-mile radius.',
    'default': 'Thank you for your message! Our team will get back to you soon. For immediate assistance, call (651)497-4609.'
  };

  const lowerMessage = message.toLowerCase();
  let response = responses.default;

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    response = responses.hello;
  } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    response = responses.price;
  } else if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
    response = responses.service;
  } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
    response = responses.contact;
  } else if (lowerMessage.includes('area') || lowerMessage.includes('location') || lowerMessage.includes('bayport')) {
    response = responses.area;
  }

  res.json({ response });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});
