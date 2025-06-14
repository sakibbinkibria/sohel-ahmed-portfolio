import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import './Section.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const initialImageSets = [
  ['/album2-pic1.jpg', '/album1-pic2.jpg', '/album1-pic1.jpg'],
  ['/album2-pic1.jpg', '/album1-pic2.jpg', '/album1-pic1.jpg'],
  ['/album2-pic1.jpg', '/album1-pic2.jpg', '/album1-pic1.jpg'],
  ['/album2-pic1.jpg', '/album1-pic2.jpg', '/album1-pic1.jpg'],
  ['/album2-pic1.jpg', '/album1-pic2.jpg', '/album1-pic1.jpg'],
  ['/album2-pic1.jpg', '/album1-pic2.jpg', '/album1-pic1.jpg'],
  ['/album2-pic1.jpg', '/album1-pic2.jpg', '/album1-pic1.jpg'],
  ['/album2-pic1.jpg', '/album1-pic2.jpg', '/album1-pic1.jpg'],
  ['/album2-pic1.jpg', '/album1-pic2.jpg', '/album1-pic1.jpg'],
];

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 800,
  autoplay: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: false,
  cssEase: 'ease-in-out',
};

const Hero = () => {
  const sliderRefs = useRef([]);
  const [visibleCount, setVisibleCount] = useState(9); // default: desktop (3x3)
  const [imageSets, setImageSets] = useState(initialImageSets); // default images

  useEffect(() => {
    const fetchGrid = async () => {
      const promises = Array.from({ length: 9 }).map((_, idx) =>
        getDoc(doc(db, "heroGrid", `cell${idx}`))
      );
      const docs = await Promise.all(promises);
      const sets = docs.map((d) =>
        d.exists()
          ? d.data().images.map((imgObj) => imgObj.url)
          : []
      );
      setImageSets(sets);
    };
    fetchGrid();
  }, []);
  

  // Detect screen width on mount and resize
  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      setVisibleCount(width < 768 ? 3 : 9); // 1-column mobile: 3 visible, otherwise 9
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const visibleIndexes = sliderRefs.current.slice(0, visibleCount);
      const randomIndex = Math.floor(Math.random() * visibleIndexes.length);
      const randomSlider = visibleIndexes[randomIndex];

      if (randomSlider) {
        randomSlider.slickNext();
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [visibleCount]);

  return (
    <section className="hero-grid-section" id="home">
      <div className="grid-background">
        {imageSets.map((set, idx) => (
          <div className="grid-cell" key={idx}>
            <Slider
              {...sliderSettings}
              ref={(el) => (sliderRefs.current[idx] = el)}
            >
              {set.map((src, i) => (
                <div key={i}>
                  <img src={src} alt={`grid-${idx}-${i}`} className="grid-image" />
                </div>
              ))}
            </Slider>
          </div>
        ))}
      </div>

      <div className="hero-overlay">
        <img src="/sa_logo.png" alt="Logo" style={{ height: '200px', width: 'auto'}} />
        <button className="enter-button">Begin the journey</button>
      </div>
    </section>
  );
};

export default Hero;
