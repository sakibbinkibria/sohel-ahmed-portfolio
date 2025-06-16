import React from 'react';
import { Link } from 'react-router-dom';
import './PhotographyLanding.css'; // use this CSS file

export default function PhotographyLanding() {
  return (
    <div className="photography-landing">
      <div className="logo-container">
        <img src="/sa_logo.png" alt="Logo" className="landing-logo" />
        <p className="photographer-name">Sohel Ahmed</p>
      </div>

      <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/galleries" className="nav-link">Galleries</Link>
        <Link to="/testimonials" className="nav-link">Testimonials</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>
    </div>
  );
};
