import React from 'react';
import { Link } from 'react-router-dom';

const serviceIconPaths = {
  homePlug: (
    <>
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v12h14V9" />
      <path d="M9 14h6" />
      <path d="M10 11v3" />
      <path d="M14 11v3" />
      <path d="M9 14v1a3 3 0 0 0 6 0v-1" />
      <path d="M12 18v3" />
    </>
  ),
  penTool: (
    <>
      <path d="m4 20 7-2 9-9-5-5-9 9-2 7Z" />
      <path d="m13 7 5 5" />
      <path d="m4 20 7-2" />
      <circle cx="4" cy="20" r="1.5" />
      <circle cx="11" cy="18" r="1.5" />
      <circle cx="20" cy="9" r="1.5" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94L14.7 6.3z" />
  ),
  calendarCheck: (
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="m8 15 2.5 2.5 5-5" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5a6 6 0 1 0-8.8 0C8.7 12.3 9.1 13 9 14" />
      <path d="M9 14h6M9 18h6M10 22h4" />
      <path d="M12 2v2M4.93 4.93l1.42 1.42M19.07 4.93l-1.42 1.42" />
    </>
  )
};

const ServiceIcon = ({ name }) => (
  <svg
    className="service-svg-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {serviceIconPaths[name]}
  </svg>
);

const Services = () => {
  const services = [
    {
      icon: 'homePlug',
      title: 'Residential Christmas Lighting',
      description: 'Transform your home with beautiful Christmas lights. We handle everything from design to installation.',
      features: [
        'Custom design consultation',
        'LED and traditional lights',
        'Roofline and landscape lighting',
        'Timer and control systems',
        'Professional installation'
      ],
    },
    {
      icon: 'penTool',
      title: 'Custom Christmas Lighting Design',
      description: 'Unique holiday lighting designs tailored to your vision and property.',
      features: [
        '3D design mockups',
        'Color coordination',
        'Specialty lighting effects',
        'Architectural highlighting',
        'Personalized themes'
      ],
    },
    {
      icon: 'wrench',
      title: 'Maintenance & Repair',
      description: 'Keep your Christmas lights looking perfect throughout the season with our maintenance services.',
      features: [
        'Regular maintenance checks',
        'Bulb replacement',
        'Timer adjustments',
        'Weather damage repair',
        'Performance optimization'
      ],
    },
    {
      icon: 'calendarCheck',
      title: 'Installation & Removal',
      description: 'Full-service installation at the start of the season and professional removal afterward.',
      features: [
        'Seasonal installation',
        'Professional removal',
        'Storage recommendations',
        'Damage-free mounting',
        'Cleanup included'
      ],
    },
    {
      icon: 'lightbulb',
      title: 'Consultation & Planning',
      description: 'Expert advice on Christmas lighting design, energy efficiency, and seasonal planning.',
      features: [
        'Property assessment',
        'Design recommendations',
        'Energy efficiency tips',
        'Budget planning',
        'Timeline coordination'
      ],
    }
  ];

  return (
    <div className="services">
      {/* Hero Section */}
      <section 
        className="hero hero-business-photo"
        style={{
          backgroundImage: `url('/images/hero/team-installation-wide-banner.jpg')`
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Christmas Light Installation Services</h1>
          <p className="hero-subtitle">
            Professional holiday lighting and Christmas light installation for residential and commercial properties in Bayport, Minnesota, from custom design and consultation through maintenance and seasonal removal.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What We Offer</h2>
          <p className="section-subtitle">
            From design to installation to maintenance, we provide comprehensive Christmas lighting services to make your holidays bright.
          </p>
          
          <div className="grid grid-2">
            {services.map((service, index) => (
              <div key={index} className="card service-card">
                <div className="service-icon">
                  <ServiceIcon name={service.icon} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                <div className="service-features">
                  <h4>What's Included:</h4>
                  <ul>
                    {service.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <Link to="/contact#quote-form" className="btn btn-primary">
                  Get Quote for This Service
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <h2 className="section-title">Our Process</h2>
          <p className="section-subtitle">
            We make Christmas lights installation simple and stress-free with our proven process.
          </p>
          
          <div className="grid grid-4">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Consultation</h3>
              <p>We discuss your vision, assess your property, and create a custom design plan.</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Quote</h3>
              <p>Receive a detailed, transparent quote with no hidden fees or surprises.</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Installation</h3>
              <p>Our professional team installs your Christmas lights with care and precision.</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Enjoy</h3>
              <p>Relax and enjoy your beautiful Christmas lights throughout the holiday season.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Choose Up-Down-Lighting?</h2>
          
          <div className="grid grid-3">
            <div className="card">
              <div className="feature-icon">🛡️</div>
              <h3>Licensed & Insured</h3>
              <p>Fully licensed and insured for your peace of mind and protection.</p>
            </div>
            
            <div className="card">
              <div className="feature-icon">⚡</div>
              <h3>Energy Efficient</h3>
              <p>We use LED lights and smart controls to minimize energy costs.</p>
            </div>
            
            <div className="card">
              <div className="feature-icon">🎯</div>
              <h3>Quality Guarantee</h3>
              <p>We stand behind our work with a satisfaction guarantee on all installations.</p>
            </div>
            
            <div className="card">
              <div className="feature-icon">🏆</div>
              <h3>Experienced Team</h3>
              <p>Professional installers with years of experience in Christmas lighting.</p>
            </div>
            
            <div className="card">
              <div className="feature-icon">💬</div>
              <h3>Great Communication</h3>
              <p>Clear communication throughout the entire process from start to finish.</p>
            </div>
            
            <div className="card">
              <div className="feature-icon">🌱</div>
              <h3>Eco-Friendly</h3>
              <p>We use sustainable practices and environmentally friendly materials.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ backgroundColor: 'var(--primary-blue)', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'white', marginBottom: '20px' }}>Ready to Light Up Your Holidays?</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
              Get your free quote today and let us transform your property into a winter wonderland.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact#quote-form" className="btn btn-secondary">Get Free Quote</Link>
              <a href="tel:6514974609" className="btn btn-secondary">Call (651)497-4609</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
