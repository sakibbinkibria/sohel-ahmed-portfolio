import React from 'react';
import './Section.css';

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <img src={'/hero.jpg'} alt="Hero" className="hero-image" />
      <div className="hero-overlay">
        <h1 className="hero-title">Sohel Ahmed</h1>
        <p className="hero-subtitle">Visual Storyteller</p>
      </div>
    </section>
  );
};

export default Hero;
