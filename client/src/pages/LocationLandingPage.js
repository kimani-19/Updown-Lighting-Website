import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import locationPages from '../locationPages.json';

const services = [
  {
    title: 'Custom lighting design',
    description: 'Plan colors and placement around the exterior features you want to highlight.',
  },
  {
    title: 'Professional installation',
    description: 'Request residential or commercial installation using the lighting options discussed for your project.',
  },
  {
    title: 'Maintenance and repair',
    description: 'Ask about in-season help if a display needs attention after installation.',
  },
  {
    title: 'Seasonal removal',
    description: 'Include post-season removal when you discuss the scope of your lighting plan.',
  },
];

const LocationLandingPage = () => {
  const { slug } = useParams();
  const location = locationPages[slug];

  if (!location) {
    return <Navigate to="/service-areas" replace />;
  }

  return (
    <div className="location-landing-page">
      <section
        className="hero hero-business-photo"
        style={{
          backgroundImage: "url('/images/hero/team-installation-wide-banner.jpg')",
        }}
      >
        <div className="hero-content">
          <p className="location-eyebrow">UpDown Lighting | {location.city}, Minnesota</p>
          <h1 className="hero-title">{location.heading}</h1>
          <p className="hero-subtitle">{location.intro}</p>
          <div className="hero-buttons">
            <Link to="/contact#quote-form" className="btn hero-quote-btn">
              Request a Free Quote
            </Link>
            <Link to="/service-areas" className="btn hero-work-btn">
              View All Service Areas
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container location-intro-grid">
          <figure className="story-photo-card location-project-photo">
            <img
              className="story-photo"
              src={location.photo}
              alt={location.photoAlt}
              loading="lazy"
            />
            <figcaption className="location-photo-caption">{location.photoCaption}</figcaption>
          </figure>

          <div className="location-approach">
            <p className="location-eyebrow">Lighting for {location.city}</p>
            <h2 className="section-title">{location.localHeading}</h2>
            <p>{location.localCopy}</p>
            <p>
              UpDown Lighting lists {location.city} among its service areas. Share your property
              address and preferred timing in the quote form to confirm project details.
            </p>
            <Link to="/contact#quote-form" className="btn btn-primary">
              Get a {location.city} Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="section location-services-section" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <h2 className="section-title">Christmas Lighting Services in {location.city}</h2>
          <p className="section-subtitle">
            Choose the services you need and discuss the project scope before approving your quote.
          </p>
          <div className="grid grid-4">
            {services.map((service) => (
              <article className="card location-service-card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Questions About Service in {location.city}?</h2>
          <div className="location-faq-list">
            {location.faqs.map((faq) => (
              <article className="location-faq-item" key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section location-cta-section">
        <div className="container">
          <div className="card text-center location-cta-card">
            <h2>Plan Your {location.city} Holiday Lighting</h2>
            <p>
              Tell us about your property and the look you have in mind. UpDown Lighting can follow
              up about design, installation, maintenance, and removal options.
            </p>
            <div className="location-cta-actions">
              <Link to="/contact#quote-form" className="btn btn-primary">
                Request a Free Quote
              </Link>
              <a href="tel:6514979609" className="btn btn-secondary">
                Call (651) 497-9609
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationLandingPage;
