import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./ImageModal.css";

export default function ImageModal({ isOpen, onClose, images }) {
  const [showControls, setShowControls] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // set on load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen) return null;

  const handleImageClick = () => {
    if (isMobile) {
      setShowControls((prev) => !prev);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    centerPadding: "0px",
    draggable: true,
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${isMobile && showControls ? "show-controls" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          handleImageClick();
        }}
      >
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <Slider {...settings}>
          {images.map((img, i) => (
            <div key={i} className="slider-image-wrapper">
              <img src={img} alt={`Slide ${i}`} className="modal-image" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
