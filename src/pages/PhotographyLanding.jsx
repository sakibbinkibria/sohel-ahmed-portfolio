import React from 'react';
import Slider from 'react-slick';
import Navbar from '../components/Navbar';
import './PhotographyLanding.css';

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div className="custom-arrow next-arrow" onClick={onClick}>
      &#8250;
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="custom-arrow prev-arrow" onClick={onClick}>
      &#8249;
    </div>
  );
}


export default function PhotographyLanding() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2400,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };
  

  const images = [
    '/album2-pic1.jpg', '/album1-pic2.jpg', '/album1-pic1.jpg'
  ];

  return (
    <div className="photography-landing">
      <Navbar />
      {/* Main Page Content Container */}
      <div className="main-content">
        <section className="slideshow-section">
          <Slider {...sliderSettings}>
            {images.map((src, index) => (
              <div key={index} className="slide-wrapper">
                <img src={src} alt={`Slide ${index + 1}`} className="slide-image" />
              </div>
            ))}
          </Slider>
        </section>
        {/* Additional content can follow here */}
      </div>
    </div>
  );
}
