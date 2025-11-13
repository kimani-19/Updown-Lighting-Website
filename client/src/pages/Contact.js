import React from 'react';

const Contact = () => {

  const contactInfo = [
    {
      icon: '📞',
      title: 'Phone',
      details: ['(651)597-9609', 'Mon-Fri: 8AM-6PM', 'Sat-Sun: 9AM-4PM'],
      action: 'tel:6515979609'
    },
    {
      icon: '✉️',
      title: 'Email',
      details: ['info@updownlighting.com', 'quotes@updownlighting.com', 'support@updownlighting.com'],
      action: 'mailto:info@updownlighting.com'
    },
    {
      icon: '📍',
      title: 'Location',
      details: ['Bayport, Minnesota', 'Serving 25-mile radius', 'Twin Cities East Metro'],
      action: null
    },
    {
      icon: '⏰',
      title: 'Business Hours',
      details: ['Monday-Friday: 8AM-6PM', 'Saturday: 9AM-4PM', 'Sunday: 9AM-4PM'],
      action: null
    }
  ];

  const faqs = [
    {
      question: 'How much does Christmas lights installation cost?',
      answer: 'Pricing varies based on property size, design complexity, and materials used. We provide free quotes with no obligation. Residential installations typically start at $299.'
    },
    {
      question: 'Do you provide the lights or do I need to buy them?',
      answer: 'We provide all materials including lights, timers, and installation hardware. This ensures quality and compatibility while saving you time and effort.'
    },
    {
      question: 'How long does installation take?',
      answer: 'Most residential installations take 2-4 hours, depending on the size and complexity of your property. We\'ll provide a time estimate during your free consultation.'
    },
    {
      question: 'Are you licensed and insured?',
      answer: 'Yes, we are fully licensed and insured. We carry general liability insurance and workers\' compensation to protect you and our team.'
    },
    {
      question: 'Do you offer maintenance and removal services?',
      answer: 'Absolutely! We provide maintenance throughout the season and professional removal after the holidays. We also store your lights for the next season if desired.'
    },
    {
      question: 'What areas do you serve?',
      answer: 'We serve Bayport, Minnesota and surrounding communities within a 25-mile radius, including Stillwater, Lake Elmo, Woodbury, and more.'
    }
  ];

  return (
    <div className="contact">
      {/* Hero Section */}
      <section 
        className="hero"
        style={{
          backgroundImage: `url('/images/hero/image1.jpeg')`
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Contact Us</h1>
          <p className="hero-subtitle">
            Ready to light up your holidays? Get in touch with our team for a free quote or any questions about our Christmas lights installation services.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Multiple ways to reach us - choose what works best for you.
          </p>
          
          <div className="grid grid-4">
            {contactInfo.map((info, index) => (
              <div key={index} className="card contact-info-card text-center">
                <div className="contact-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <div className="contact-details">
                  {info.details.map((detail, idx) => (
                    <p key={idx}>{detail}</p>
                  ))}
                </div>
                {info.action && (
                  <a href={info.action} className="btn btn-primary">
                    {info.title === 'Phone' ? 'Call Now' : 'Send Email'}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'start', gap: '60px' }}>
            <div>
              <h2 className="section-title">Get a Free Quote</h2>
              <p className="section-subtitle">
                Fill out the form below and we'll get back to you within 24 hours with a free, no-obligation quote.
              </p>
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSf-K37kA91u7AZmqZ2YTlZJ5Rl24o3oqduIto2OMba2JXJrYw/viewform?embedded=true" 
                width="100%" 
                height="1197" 
                frameBorder="0" 
                marginHeight="0" 
                marginWidth="0"
                title="Get a Free Quote"
              >
                Loading…
              </iframe>
            </div>
            
            <div>
              <h3>Quick Contact Options</h3>
              <div className="quick-contact">
                <div className="quick-contact-item">
                  <h4>📞 Call Now</h4>
                  <p>Speak directly with our team</p>
                  <a href="tel:6514974609" className="btn btn-secondary">(651)497-4609</a>
                </div>
                
                <div className="quick-contact-item">
                  <h4>✉️ Email Us</h4>
                  <p>Send us an email anytime</p>
                  <a href="mailto:info@updownlighting.com" className="btn btn-secondary">info@updownlighting.com</a>
                </div>
                
                <div className="quick-contact-item">
                  <h4>📋 Get Free Quote</h4>
                  <p>Quick quote request form</p>
                  <a href="/" className="btn btn-primary">Quote Form</a>
                </div>
              </div>
              
              <div className="emergency-notice">
                <h4>🚨 Emergency Service</h4>
                <p>
                  Need urgent repairs or have a lighting emergency? 
                  Call us at <strong>(651)597-9609"</strong> for same-day emergency service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find answers to common questions about our Christmas lights installation services.
          </p>
          
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center" style={{ marginTop: '40px' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
              Still have questions? We're here to help!
            </p>
            <a href="tel:6515979609" className="btn btn-primary">Call Us Now</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
