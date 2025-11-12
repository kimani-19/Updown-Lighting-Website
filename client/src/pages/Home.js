import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Chatbot from '../components/Chatbot';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service_type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (formData.message && formData.message.length > 500) {
      errors.message = 'Message must be less than 500 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitMessage('Please correct the errors below and try again.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await axios.post('/api/quotes', formData);
      setSubmitMessage('Thank you! Your quote request has been submitted. We\'ll contact you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        service_type: '',
        message: ''
      });
      setFormErrors({});
    } catch (error) {
      console.error('Submission error:', error);
      if (error.response?.status === 400) {
        setSubmitMessage('Please check your information and try again.');
      } else if (error.response?.status >= 500) {
        setSubmitMessage('Our server is experiencing issues. Please try again later or call us directly.');
      } else {
        setSubmitMessage('Sorry, there was an error submitting your request. Please try again or call us directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Home;
