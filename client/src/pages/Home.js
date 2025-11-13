import React from 'react';
import { Link } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import GoogleReviews from '../components/GoogleReviews';

const Home = () => {

  return (
    <div className="home">
      {/* Hero Section */}
      <section 
        className="hero"
        style={{
          backgroundImage: `url('/images/hero/image1.jpeg')`
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Professional Christmas Lights Installation</h1>
          <p className="hero-subtitle">
            Transform your home into a winter wonderland with our expert Christmas lights installation service in Bayport, Minnesota and surrounding areas.
          </p>
          <div className="hero-buttons">
            <a href="#quote-form" className="btn btn-primary">Get Free Quote</a>
            <Link to="/gallery" className="btn btn-secondary">View Our Work</Link>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="section">
        <div className="container">
          <h2 className="section-title">Get Your Free Quote</h2>
          <p className="section-subtitle">
            Ready to light up your holidays? Fill out our form and we'll provide you with a free, no-obligation quote for your Christmas lights installation.
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
      </section>

      {/* Page Previews Section */}
      <section className="page-previews">
        <div className="container">
          <h2 className="section-title">Explore Our Services</h2>
          <p className="section-subtitle">
            Discover everything we offer to make your Christmas lighting dreams come true.
          </p>
          
          <div className="grid grid-3">
            <div className="preview-card">
              <div className="preview-icon">🔧</div>
              <h3 className="preview-title">Our Services</h3>
              <p className="preview-description">
                Professional installation, maintenance, and removal services for residential and commercial properties.
              </p>
              <Link to="/services" className="btn btn-primary">Learn More</Link>
            </div>
            
            <div className="preview-card">
              <div className="preview-icon">📍</div>
              <h3 className="preview-title">Service Areas</h3>
              <p className="preview-description">
                We proudly serve Bayport, Minnesota and surrounding communities within a 25-mile radius.
              </p>
              <Link to="/service-areas" className="btn btn-primary">View Areas</Link>
            </div>
            
            <div className="preview-card">
              <div className="preview-icon">📸</div>
              <h3 className="preview-title">Gallery</h3>
              <p className="preview-description">
                See our beautiful Christmas light installations and get inspired for your own project.
              </p>
              <Link to="/gallery" className="btn btn-primary">View Gallery</Link>
            </div>
            
            <div className="preview-card">
              <div className="preview-icon">👥</div>
              <h3 className="preview-title">About Us</h3>
              <p className="preview-description">
                Learn about our experienced team and our commitment to quality Christmas lighting services.
              </p>
              <Link to="/about-us" className="btn btn-primary">Meet Our Team</Link>
            </div>
            
            <div className="preview-card">
              <div className="preview-icon">📞</div>
              <h3 className="preview-title">Contact Us</h3>
              <p className="preview-description">
                Get in touch with our team for questions, quotes, or to schedule your installation.
              </p>
              <Link to="/contact" className="btn btn-primary">Contact Us</Link>
            </div>
            
            <div className="preview-card">
              <div className="preview-icon">⭐</div>
              <h3 className="preview-title">Why Choose Us</h3>
              <p className="preview-description">
                Licensed, insured, and experienced professionals dedicated to making your holidays bright.
              </p>
              <Link to="/about-us" className="btn btn-primary">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="section">
        <div className="container">
          <GoogleReviews />
        </div>
      </section>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Home;
