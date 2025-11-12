import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/images/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img 
            src={logoImage} 
            alt="Up-Down-Lighting Logo" 
            className="logo-image"
          />
          <span className="logo-text">Up-Down-Lighting</span>
        </Link>
        
        <ul className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
          <li>
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/service-areas" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Service Areas
            </Link>
          </li>
          <li>
            <Link to="/gallery" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
        
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
