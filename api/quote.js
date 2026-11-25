const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[character]));

const allowedServices = [
  'Residential Installation',
  'Maintenance and Removal',
  'Custom Design',
  'Consultation Only',
];

module.exports = async (req, res) => {
  res.setHeader('Allow', 'POST');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    return res.status(500).json({
      error: 'Supabase is not configured on the server.',
    });
  }

  const body = req.body || {};
  const data = {
    full_name: String(body.full_name ?? '').trim(),
    email_address: String(body.email_address ?? '').trim(),
    phone_number: String(body.phone_number ?? '').trim(),
    property_address: String(body.property_address ?? '').trim(),
    service_type: String(body.service_type ?? '').trim(),
    additional_details: String(body.additional_details ?? '').trim(),
  };

  const invalid =
    !data.full_name ||
    !data.email_address ||
    !data.phone_number ||
    !data.property_address ||
    !allowedServices.includes(data.service_type) ||
    data.full_name.length > 150 ||
    data.email_address.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email_address) ||
    data.phone_number.length > 30 ||
    data.property_address.length > 500 ||
    data.additional_details.length > 3000;

  if (invalid) {
    return res.status(400).json({
      error: 'Please check your form information.',
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseSecretKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });

    const { data: savedQuote, error } = await supabase
      .from('quote_requests')
      .insert(data)
      .select('id')
      .single();

    if (error) {
      console.error('Supabase quote error:', error);
      return res.status(500).json({
        error: 'Unable to process your request.',
      });
    }

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          replyTo: data.email_address,
          subject: 'New Quote Request - Up-Down-Lighting',
          text: [
            'New Quote Request',
            `Name: ${data.full_name}`,
            `Email: ${data.email_address}`,
            `Phone: ${data.phone_number}`,
            `Address: ${data.property_address}`,
            `Service Type: ${data.service_type}`,
            `Additional Details: ${data.additional_details || 'None provided'}`,
          ].join('\n'),
          html: `
            <h2>New Quote Request</h2>
            <p><strong>Name:</strong> ${escapeHtml(data.full_name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(data.email_address)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(data.phone_number)}</p>
            <p><strong>Address:</strong> ${escapeHtml(data.property_address)}</p>
            <p><strong>Service Type:</strong> ${escapeHtml(data.service_type)}</p>
            <p><strong>Additional Details:</strong><br>${escapeHtml(data.additional_details || 'None provided').replace(/\n/g, '<br>')}</p>
          `,
        });
      } catch (emailError) {
        console.error('Quote notification email failed:', emailError);
      }
    } else {
      console.error('Quote notification email skipped: EMAIL_USER or EMAIL_PASS is not configured.');
    }

    return res.status(201).json({
      id: savedQuote.id,
      message: 'Quotation request submitted!',
    });
  } catch (error) {
    console.error('Quote API error:', error);
    return res.status(500).json({
      error: 'Unable to process your request.',
    });
  }
};
