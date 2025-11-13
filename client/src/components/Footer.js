import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Up-Down-Lighting</h3>
            <p>Professional Christmas lights installation service in Bayport, Minnesota and surrounding areas.</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <p><Link to="/services">Services</Link></p>
            <p><Link to="/service-areas">Service Areas</Link></p>
            <p><Link to="/gallery">Gallery</Link></p>
            <p><Link to="/about-us">About Us</Link></p>
            <p><Link to="/contact">Contact</Link></p>
          </div>
          
          <div className="footer-section">
            <h3>Contact Info</h3>
            <p>📞 (651) 497-9609</p>
            <p>✉️ info@updownlighting.com</p>
            <p>📍 Bayport, Minnesota</p>
            <p>🕒 Mon-Fri: 8AM-6PM</p>
            <p>🕒 Sat-Sun: 9AM-4PM</p>
          </div>
          
          <div className="footer-section">
            <h3>Service Areas</h3>
            <p>Bayport, MN</p>
            <p>Stillwater, MN</p>
            <p>Lake Elmo, MN</p>
            <p>Woodbury, MN</p>
            <p>And surrounding areas</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Up-Down-Lighting. All rights reserved. | Professional Christmas Lights Installation</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
