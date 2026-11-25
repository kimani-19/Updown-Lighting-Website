module.exports = async (req, res) => {
  res.setHeader('Allow', 'POST');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const message = String(req.body?.message || '').trim();
  if (!message) {
    return res.status(400).json({ error: 'Please enter a message.' });
  }

  if (message.length > 500) {
    return res.status(400).json({ error: 'Please keep your message under 500 characters.' });
  }

  const lowerMessage = message.toLowerCase();
  const intents = [
    ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    ['price', 'cost', 'pricing', 'how much', 'budget', 'afford'],
    ['quote', 'estimate', 'proposal', 'bid'],
    ['service', 'services', 'what do you do', 'offer'],
    ['installation', 'install', 'hang', 'put up', 'setup'],
    ['removal', 'take down', 'takedown', 'remove'],
    ['maintenance', 'repair', 'bulb', 'fix', 'problem'],
    ['custom', 'design', 'layout', 'look', 'idea'],
    ['commercial', 'business', 'store', 'office'],
    ['residential', 'house', 'home', 'roof', 'yard'],
    ['light', 'lights', 'led', 'bulb', 'color', 'white', 'warm'],
    ['timer', 'smart', 'control', 'schedule', 'automatic'],
    ['area', 'location', 'where', 'bayport', 'stillwater', 'woodbury'],
    ['availability', 'available', 'appointment', 'book'],
    ['business hours', 'open', 'hours', 'weekend'],
    ['phone', 'call', 'telephone', 'number'],
    ['email', 'mail', 'e-mail'],
    ['contact', 'reach', 'get in touch'],
    ['insured', 'insurance', 'license', 'licensed', 'certified'],
    ['storage', 'store', 'keep'],
    ['how long', 'duration', 'days', 'time'],
    ['thank', 'thanks', 'appreciate'],
    ['bye', 'goodbye', 'see you']
  ];

  const responses = [
    'Hello! Welcome to Up-Down-Lighting. How can I help with your holiday lighting project?',
    'Pricing depends on property size, roof access, design, materials, and maintenance needs. Use our free quote form for a personalized estimate.',
    'You can request a free, no-obligation quote through the Get a Free Quote form on this website.',
    'We provide residential and commercial Christmas light installation, custom design, maintenance, take-down, and storage support.',
    'Our team provides professional seasonal installation using secure, weather-resistant mounting and materials.',
    'Yes, we provide professional post-season removal and cleanup. We can also help plan storage for the lights.',
    'We offer maintenance throughout the season, including bulb, timer, connection, and weather-related repairs.',
    'We create custom designs based on your property, preferred colors, rooflines, landscaping, and holiday style.',
    'Yes, we install holiday lighting for homes and commercial properties. A quote form helps us assess the project size.',
    'We install Christmas lights on homes, roofs, trees, bushes, walkways, and other residential features.',
    'We offer LED and traditional-style options, including warm white and custom color combinations.',
    'Timers and automatic controls can be included so your display turns on and off at scheduled times.',
    'We serve Bayport, Minnesota and surrounding communities within a 25-mile radius, including many Twin Cities East Metro areas.',
    'Availability varies by season. Request a quote early to reserve installation, maintenance, or removal dates.',
    'Our listed business hours are Monday-Friday 8 AM-6 PM and Saturday-Sunday 9 AM-4 PM.',
    'You can call Up-Down-Lighting at (651)497-4609.',
    'You can email Up-Down-Lighting at updownlighting19@gmail.com.',
    'Call (651)497-4609, email updownlighting19@gmail.com, or submit the website quote form.',
    'Up-Down-Lighting is a professional, licensed and insured service. Ask us if you need documentation for a property or HOA.',
    'We can discuss off-season storage options when planning your installation and removal service.',
    'Residential installation times vary with property size and design complexity. Most projects are completed in a few hours.',
    'You are welcome! Let us know if you have another question about holiday lighting.',
    'Thank you for contacting Up-Down-Lighting. Have a bright holiday season!'
  ];

  const intentIndex = intents.findIndex((terms) =>
    terms.some((term) => lowerMessage.includes(term))
  );
  const response =
    intentIndex >= 0
      ? responses[intentIndex]
      : 'I can help with pricing, quotes, installation, maintenance, removal, service areas, scheduling, or contact details. Please tell me what you need.';

  return res.status(200).json({ response });
};
