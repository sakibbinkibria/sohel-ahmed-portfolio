import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useLocation, useHistory } from 'react-router-dom';
import './Section.css';

// const initialImageSets = [
//   ['/album2-pic1.jpg', '/album1-pic2.jpg', '/album1-pic1.jpg'],
//   ['/album2-pic1.jpg', '/album1-pic2.jpg', '/album1-pic1.jpg'],
//   ['/album2-pic1.jpg', '/album1-pic2.jpg', '/album1-pic1.jpg'],
//   ['/album2-pic1.jpg', '/album1-pic2.jpg', '/album1-pic1.jpg'],
//   ['/album2-pic1.jpg', '/album1-pic2.jpg', '/album1-pic1.jpg'],
//   ['/album2-pic1.jpg', '/album1-pic2.jpg', '/album1-pic1.jpg'],
//   ['/album2-pic1.jpg', '/album1-pic2.jpg', '/album1-pic1.jpg'],
//   ['/album2-pic1.jpg', '/album1-pic2.jpg', '/album1-pic1.jpg'],
//   ['/album2-pic1.jpg', '/album1-pic2.jpg', '/album1-pic1.jpg'],
// ];

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
  const [imageSets, setImageSets] = useState([]); // default images
  const [loadedCells, setLoadedCells] = useState(Array(9).fill(false));
  const mobileIndexes = [1, 4, 7];
  const isAllLoaded =
    visibleCount === 3
      ? mobileIndexes.every((i) => loadedCells[i])
      : loadedCells.every(Boolean);
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [location.pathname]);

  useEffect(() => {
    const updateHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);


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
    if (!isAllLoaded) return; // Wait until all images have loaded

    let slidSet = new Set();

    const interval = setInterval(() => {
      const visibleIndexes = sliderRefs.current.slice(0, visibleCount);

      if (slidSet.size === visibleIndexes.length) {
        slidSet.clear();
      }

      const availableIndexes = visibleIndexes
        .map((_, idx) => idx)
        .filter((idx) => !slidSet.has(idx));

      if (availableIndexes.length === 0) return;

      const randomIdx = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
      const randomSlider = sliderRefs.current[randomIdx];

      if (randomSlider) {
        randomSlider.slickNext();
        slidSet.add(randomIdx);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [visibleCount, isAllLoaded]);

  return (
    <section className={`hero-grid-section ${isAllLoaded ? 'fade-in' : ''}`} id="home">
      {!isAllLoaded && (
        <div className="hero-loader-screen">
          <div className="spinner-ring-wrapper">
            <div className="spinner-ring" />
            <img src="/sa_logo.png" alt="Logo" className="loader-logo-inside" style={{ width: 'auto', height: '90px' }} />
          </div>
        </div>
      )}


      <div className="grid-background">
        {imageSets?.length > 0 &&
          imageSets.map((set, idx) => (
            <div className="grid-cell" key={idx}>
              <Slider
                {...sliderSettings}
                ref={(el) => (sliderRefs.current[idx] = el)}
              >
                {set.map((src, i) => (
                  <div key={i}>
                    <img
                      src={src}
                      alt={`grid-${idx}-${i}`}
                      className="grid-image"
                      onLoad={() => {
                        if (i === 0) {
                          setLoadedCells((prev) => {
                            if (prev[idx]) return prev;
                            const updated = [...prev];
                            updated[idx] = true;
                            return updated;
                          });
                        }
                      }}
                      onError={(e) => {
                        e.target.src = '/fallback.jpg';
                      }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          ))}
      </div>

      <div className="hero-overlay">
        <img src="/sa_logo.png" alt="Logo" className='center-logo' />
        <button className="enter-button" onClick={()=>{
          history.push('/photography');
        }}>Begin the journey</button>
      </div>
    </section>

  );

};

export default Hero;
