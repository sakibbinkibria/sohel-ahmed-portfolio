import React, { useState } from 'react';
import './Navbar.css';
import { FaInstagram, FaFacebookF, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <span className="navbar-logo" onClick={() => scrollToSection('home')}>
            Sohel Ahmed
          </span>
        </div>

        <div className="navbar-links">
          <span onClick={() => scrollToSection('featured')}>Featured Work</span>
          <span onClick={() => scrollToSection('gallery')}>Gallery</span>
          <span onClick={() => scrollToSection('story')}>My Story</span>
        </div>

        <div className="navbar-icons">
          <a href="https://www.instagram.com/sohel.ahmed.stories/" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/SohelAhmed47" target="_blank" rel="noreferrer">
            <FaFacebookF />
          </a>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(true)}>
          <FaBars />
        </div>
      </nav>

      {menuOpen && (
        <div className="side-menu" onClick={() => setMenuOpen(false)}>
          <div className="side-menu-content" onClick={(e) => e.stopPropagation()}>
            <FaTimes className="close-icon" onClick={() => setMenuOpen(false)} />
            <span onClick={() => scrollToSection('featured')}>Featured Work</span>
            <span onClick={() => scrollToSection('gallery')}>Gallery</span>
            <span onClick={() => scrollToSection('story')}>My Story</span>
            <div className="side-icons">
              <a href="https://www.instagram.com/sohel.ahmed.stories/" target="_blank" rel="noreferrer"><FaInstagram /></a>
              <a href="https://www.facebook.com/SohelAhmed47" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
