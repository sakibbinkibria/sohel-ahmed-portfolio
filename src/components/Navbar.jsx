import React from 'react';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="logo-container">
        <img src="/sa_logo.png" alt="Logo" className="landing-logo" />
        <p className="photographer-name">Sohel Ahmed</p>
      </div>

      <nav className="nav-links">
        <Link to="/photography" className={`nav-link ${isActive('/photography') ? 'active' : ''}`}>Home</Link>
        <Link to="/wedding" className={`nav-link ${isActive('/wedding') ? 'active' : ''}`}>Weddings</Link>
        <Link to="/fashion" className={`nav-link ${isActive('/fashion') ? 'active' : ''}`}>Fashion</Link>
        <Link to="/achievements" className={`nav-link ${isActive('/achievements') ? 'active' : ''}`}>Achievements</Link>
        <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
        <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
      </nav>
    </>
  );
};

export default Navbar;
