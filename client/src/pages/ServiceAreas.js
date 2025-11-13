import React from 'react';
import { Link } from 'react-router-dom';

const ServiceAreas = () => {
  const serviceAreas = [
    {
      city: 'Bayport',
      state: 'MN',
      description: 'Our home base and primary service area',
      distance: '0 miles',
      features: ['Same-day service available', 'Local business support', 'Community events']
    },
    {
      city: 'Oak Park Heights',
      state: 'MN',
      description: 'Neighboring city with a mix of residential and commercial properties',
      distance: '3 miles',
      features: ['Neighborhood displays', 'Community lighting', 'Commercial services']
    },
    {
      city: 'Stillwater',
      state: 'MN',
      description: 'Historic downtown and residential areas',
      distance: '8 miles',
      features: ['Historic district lighting', 'Residential neighborhoods', 'Commercial properties']
    },
   
    
    {
      city: 'Lake Elmo',
      state: 'MN',
      description: 'Suburban communities and luxury homes',
      distance: '12 miles',
      features: ['Luxury home installations', 'Gated communities', 'Custom designs']
    },
    {
      city: 'Woodbury',
      state: 'MN',
      description: 'Growing community with modern homes',
      distance: '15 miles',
      features: ['New construction lighting', 'Modern designs', 'Energy-efficient solutions']
    },
    {
      city: 'Oakdale',
      state: 'MN',
      description: 'Family-friendly neighborhoods',
      distance: '18 miles',
      features: ['Family home lighting', 'School partnerships', 'Community programs']
    },
    {
      city: 'Cottage Grove',
      state: 'MN',
      description: 'Suburban and rural properties',
      distance: '20 miles',
      features: ['Rural property lighting', 'Large installations', 'Custom solutions']
    },
    {
      city: 'Hastings',
      state: 'MN',
      description: 'Historic city with diverse properties',
      distance: '22 miles',
      features: ['Historic home lighting', 'Downtown commercial', 'Mixed-use properties']
    },
    {
      city: 'Saint Paul',
      state: 'MN',
      description: 'Minnesota’s capital city with vibrant neighborhoods and businesses',
      distance: '22 miles',
      features: ['Urban neighborhood installs', 'Business district displays', 'Event lighting']
    },
    
    {
      city: 'Afton',
      state: 'MN',
      description: 'Scenic properties and estates',
      distance: '25 miles',
      features: ['Estate lighting', 'Scenic property highlights', 'Luxury installations']
    },
    {
      city: 'Minneapolis',
      state: 'MN',
      description: 'The largest city in Minnesota with diverse holiday lighting needs',
      distance: '27 miles',
      features: ['Downtown building lighting', 'Lakes area installations', 'Large-scale displays']
    },
  ];

  const coverageInfo = [
    {
      icon: '🚗',
      title: '25-Mile Radius',
      description: 'We serve all areas within a 25-mile radius of Bayport, MN'
    },
    {
      icon: '⏰',
      title: 'Flexible Scheduling',
      description: 'Available 7 days a week to accommodate your schedule'
    },
    {
      icon: '🛡️',
      title: 'Fully Insured',
      description: 'Licensed and insured to work in all service areas'
    },
    {
      icon: '💡',
      title: 'Local Knowledge',
      description: 'Familiar with local regulations and neighborhood aesthetics'
    }
  ];

  return (
    <div className="service-areas">
      {/* Hero Section */}
      <section 
        className="hero"
        style={{
          backgroundImage: `url('/images/hero/image1.jpeg')`
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Service Areas</h1>
          <p className="hero-subtitle">
            We proudly serve Bayport, Minnesota and surrounding communities within a 25-mile radius. 
            Find your city below or contact us to confirm coverage.
          </p>
        </div>
      </section>

      {/* Coverage Info */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Coverage</h2>
          <p className="section-subtitle">
            Professional Christmas lights installation services across the Twin Cities East Metro area.
          </p>
          
          <div className="grid grid-4">
            {coverageInfo.map((info, index) => (
              <div key={index} className="card text-center">
                <div className="feature-icon" style={{ fontSize: '3rem', marginBottom: '20px' }}>
                  {info.icon}
                </div>
                <h3>{info.title}</h3>
                <p>{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas Grid */}
      <section className="section" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <h2 className="section-title">Cities We Serve</h2>
          <p className="section-subtitle">
            Click on any city to learn more about our services in that area.
          </p>
          
          <div className="grid grid-2">
            {serviceAreas.map((area, index) => (
              <div key={index} className="card service-area-card">
                <div className="area-header">
                  <h3 className="area-name">{area.city}, {area.state}</h3>
                  <span className="area-distance">{area.distance}</span>
                </div>
                <p className="area-description">{area.description}</p>
                
                <div className="area-features">
                  <h4>Services Available:</h4>
                  <ul>
                    {area.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="area-actions">
                  <Link to="/contact" className="btn btn-primary">
                    Get Quote for {area.city}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Service Area Map</h2>
          <p className="section-subtitle">
            Our 25-mile service radius covers the Twin Cities East Metro area.
          </p>
          
          <div className="map-container">
            <div className="map-placeholder">
              <div className="map-content">
                <h3>📍 Service Coverage Map</h3>
                <p>Bayport, MN - Our Home Base</p>
                <div className="map-features">
                  <div className="map-feature">
                    <span className="map-dot primary"></span>
                    <span>Bayport (Home Base)</span>
                  </div>
                  <div className="map-feature">
                    <span className="map-dot secondary"></span>
                    <span>Primary Service Areas</span>
                  </div>
                  <div className="map-feature">
                    <span className="map-dot tertiary"></span>
                    <span>Extended Coverage (25 miles)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Services */}
      <section className="section" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <h2 className="section-title">Special Services by Area</h2>
          
          <div className="grid grid-3">
            <div className="card">
              <h3>🏛️ Historic Districts</h3>
              <p>Specialized lighting for historic homes in Stillwater and Hastings, respecting architectural integrity while enhancing holiday beauty.</p>
              <ul>
                <li>Period-appropriate designs</li>
                <li>Historic preservation compliance</li>
                <li>Custom color schemes</li>
              </ul>
            </div>
            
            <div className="card">
              <h3>🏘️ New Developments</h3>
              <p>Modern lighting solutions for new construction in Woodbury and Lake Elmo, featuring the latest in LED technology.</p>
              <ul>
                <li>Smart home integration</li>
                <li>Energy-efficient systems</li>
                <li>Contemporary designs</li>
              </ul>
            </div>
            
            <div className="card">
              <h3>🏡 Rural Properties</h3>
              <p>Large-scale installations for rural properties in Cottage Grove and Afton, maximizing visibility and impact.</p>
              <ul>
                <li>Long-distance visibility</li>
                <li>Weather-resistant materials</li>
                <li>Custom power solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Not in Our Area? */}
      <section className="section">
        <div className="container">
          <div className="card text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2>Don't See Your City?</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
              We're always expanding our service areas. If you don't see your city listed, 
              contact us anyway! We may be able to accommodate your location or refer you to 
              a trusted partner in your area.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary">Contact Us</Link>
              <a href="tel:6514974609" className="btn btn-secondary">Call (651)497-4609</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceAreas;
