import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logoImage from '../assets/images/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);

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
        
        <ul
          id="primary-navigation"
          className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}
        >
          <li>
            <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={closeMenu}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/service-areas" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={closeMenu}>
              Service Areas
            </NavLink>
          </li>
          <li>
            <NavLink to="/gallery" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={closeMenu}>
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink to="/about-us" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={closeMenu}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin" className="nav-admin-link" onClick={closeMenu}>
              Admin
            </NavLink>
          </li>
          <li>
            <Link to="/contact#quote-form" className="nav-quote-btn" onClick={closeMenu}>
              Get a Free Quote
            </Link>
          </li>
        </ul>
        
        <button
          className="mobile-menu-btn"
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={toggleMenu}
        >
          <span aria-hidden="true">{isMenuOpen ? '×' : '☰'}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
