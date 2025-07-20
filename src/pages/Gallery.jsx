import React from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Gallery.css';

export default function Gallery() {
  const history = useHistory();

  return (
    <div className="gallery-landing">
      <Navbar />
      <div className="gallery-choice">
        <div
          className="gallery-panel wedding"
          onClick={() => history.push('/albums/wedding')}
        >
          <div className="overlay">
            <h2>Explore Wedding</h2>
          </div>
        </div>
        <div
          className="gallery-panel fashion"
          onClick={() => history.push('/albums/fashion')}
        >
          <div className="overlay">
            <h2>Explore Fashion</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
