import React from 'react';
import { Link } from 'react-router-dom';
import locationPages from '../locationPages.json';

const locationPagesByCity = Object.fromEntries(
  Object.values(locationPages).map((page) => [page.city, page])
);

const ServiceAreas = () => {
  const serviceAreas = [
    {
      city: 'Bayport',
      state: 'MN',
      description: 'Our home base and primary service area',
      distance: '0 mi',
      features: ['Primary service area', 'Residential and commercial projects', 'Custom designs available']
    },
    {
      city: 'Oak Park Heights',
      state: 'MN',
      description: 'Neighboring city with a mix of residential and commercial properties',
      distance: '~2 mi',
      features: ['Residential properties', 'Commercial properties', 'Custom designs available']
    },
    {
      city: 'Stillwater',
      state: 'MN',
      description: 'Historic downtown and residential areas',
      distance: '~3 mi',
      features: ['Historic district lighting', 'Residential neighborhoods', 'Commercial properties']
    },
   
    
    {
      city: 'Lake Elmo',
      state: 'MN',
      description: 'Suburban communities and luxury homes',
      distance: '~5 mi',
      features: ['Residential installations', 'Custom designs', 'Consultation and planning']
    },
    {
      city: 'Woodbury',
      state: 'MN',
      description: 'Growing community with modern homes',
      distance: '~10 mi',
      features: ['New construction lighting', 'Modern designs', 'LED and traditional light options']
    },
    {
      city: 'Oakdale',
      state: 'MN',
      description: 'Family-friendly neighborhoods',
      distance: '~9 mi',
      features: ['Residential lighting', 'Custom design consultation', 'Seasonal maintenance and removal']
    },
    {
      city: 'Cottage Grove',
      state: 'MN',
      description: 'Suburban and rural properties',
      distance: '~16 mi',
      features: ['Rural property lighting', 'Large installations', 'Custom solutions']
    },
    {
      city: 'Hastings',
      state: 'MN',
      description: 'Historic city with diverse properties',
      distance: '~20 mi',
      features: ['Historic home lighting', 'Downtown commercial', 'Mixed-use properties']
    },
    {
      city: 'Saint Paul',
      state: 'MN',
      description: 'Minnesota’s capital city with vibrant neighborhoods and businesses',
      distance: '~16 mi',
      features: ['Urban neighborhood installs', 'Business district displays', 'Event lighting']
    },
    
    {
      city: 'Afton',
      state: 'MN',
      description: 'Scenic properties and estates',
      distance: '~8 mi',
      features: ['Estate lighting', 'Scenic property highlights', 'Luxury installations']
    },
    {
      city: 'Minneapolis',
      state: 'MN',
      description: 'The largest city in Minnesota with diverse holiday lighting needs',
      distance: '~24 mi',
      features: ['Downtown building lighting', 'Lakes area installations', 'Large-scale displays']
    },
  ];

  const coverageInfo = [
    {
      icon: '🚗',
      title: 'Listed East Metro Communities',
      description: 'Bayport and nearby communities listed below; share your address to confirm service.'
    },
    {
      icon: '⏰',
      title: 'Residential & Commercial',
      description: 'The service offering includes lighting for homes and commercial properties.'
    },
    {
      icon: '💡',
      title: 'Seasonal Service',
      description: 'Design, installation, in-season maintenance, and seasonal removal are listed services.'
    },
    {
      icon: '🗓️',
      title: 'Consultation & Planning',
      description: 'Discuss property features and design preferences before approving a project quote.'
    }
  ];

  return (
    <div className="service-areas">
      {/* Hero Section */}
      <section 
        className="hero hero-business-photo"
        style={{
          backgroundImage: `url('/images/hero/team-installation-wide-banner.jpg')`
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Christmas Light Installation Service Areas</h1>
          <p className="hero-subtitle">
            UpDown Lighting provides Christmas light installation in Bayport, MN and nearby communities, including Stillwater, MN, Woodbury, MN, and Lake Elmo, MN.
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
            Request a quote for any listed city, or explore a local service page for the featured communities.
          </p>
          <p className="area-distance-note">
            Distances are approximate straight-line measurements from Bayport city center to each
            city center, not driving distances. Location data: <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>.
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
                  <Link to="/contact#quote-form" className="btn btn-primary">
                    Get Quote for {area.city}
                  </Link>
                  {locationPagesByCity[area.city] && (
                    <Link
                      to={locationPagesByCity[area.city].path}
                      className="area-explore-link"
                    >
                      Explore {area.city} Services
                    </Link>
                  )}
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
            We serve the communities listed on this page. Contact us with your address to confirm coverage.
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
                    <span>Listed East Metro Communities</span>
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
              <Link to="/contact#quote-form" className="btn btn-primary">Contact Us</Link>
              <a href="tel:6514974609" className="btn btn-secondary">Call (651)497-4609</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceAreas;
