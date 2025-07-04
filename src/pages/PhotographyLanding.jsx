import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import Navbar from '../components/Navbar';
import { useAppData } from '../context/AppDataContext';
import { db } from '../firebase/firebase'; // adjust path as needed
import { collection, getDocs } from 'firebase/firestore';
import './PhotographyLanding.css';

function NextArrow(props) {
  return (
    <div className="custom-arrow next-arrow" onClick={props.onClick}>
      &#8250;
    </div>
  );
}

function PrevArrow(props) {
  return (
    <div className="custom-arrow prev-arrow" onClick={props.onClick}>
      &#8249;
    </div>
  );
}

export default function PhotographyLanding() {
  const { featuredImages: contextImages } = useAppData();
  const [featuredImages, setFeaturedImages] = useState(contextImages || []);
  const [loadedSrcs, setLoadedSrcs] = useState(new Set());
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [featuredDescription, setFeaturedDescription] = useState("");

  const sliderRef = useRef(null);

  // If context didn't provide images, fetch manually
  useEffect(() => {
    if (featuredImages.length === 0 && (!contextImages || contextImages.length === 0)) {
      setIsLoading(true);
      const fetchImages = async () => {
        try {
          const snapshot = await getDocs(collection(db, 'featured'));
          const doc = snapshot.docs[0];
          const images = doc?.data()?.images || [];
          setFeaturedImages(images);
          setFeaturedDescription(doc?.data()?.description);
          setIsLoading(false);
        } catch (err) {
          console.error('Error fetching featured images:', err);
        }
      };
  
      fetchImages();
    }
  }, [contextImages, featuredImages?.length]);
  

  // Track when all images are loaded
  useEffect(() => {
    if (featuredImages.length > 0 && loadedSrcs.size === featuredImages.length) {
      setImagesLoaded(true);

      // // force slick to recalc height
      // setTimeout(() => {
      //   window.dispatchEvent(new Event('resize'));
      //   sliderRef.current?.innerSlider?.onWindowResized();
      // }, 50);
    }
  }, [loadedSrcs, featuredImages]);

  const handleImageLoad = (e, src) => {
    // skip slick’s duplicate clones
    if (e.target.closest('.slick-cloned')) return;

    setLoadedSrcs(prev => {
      if (prev.has(src)) return prev;           // already counted
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  };

  const sliderSettings = {
    dots: true,
    infinite: featuredImages.length > 1, // 👈 only infinite if more than one
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: featuredImages.length > 1, // 👈 autoplay also disabled for single image
    autoplaySpeed: 2400,
    nextArrow: featuredImages.length > 1 ? <NextArrow /> : null,
    prevArrow: featuredImages.length > 1 ? <PrevArrow /> : null,
    adaptiveHeight: true,
  };

  return (
    <div className="photography-landing">
      <Navbar />
      <div className="main-content">
        <section className="slideshow-section">
          {isLoading && <div className="loading-spinner">Loading...</div>}

          {!isLoading && imagesLoaded && featuredImages.length > 0 && (
            <Slider ref={sliderRef} {...sliderSettings}>
              {featuredImages.map((img, index) => (
                <div key={index} className="slide-wrapper">
                  <img
                    src={img.url}
                    alt={`Slide ${index + 1}`}
                    className="slide-image"
                    onLoad={(e) => handleImageLoad(e, img.url)}
                  />
                </div>
              ))}
            </Slider>
          )}

          {/* Preload images invisibly (before slider mounts) */}
          {!isLoading && !imagesLoaded &&
            featuredImages.map((img) => (
              <img
                key={img.url}
                src={img.url}
                alt=""
                style={{ display: 'none' }}
                onLoad={(e) => handleImageLoad(e, img.url)}
              />
            ))}
        </section>

        <div className='paragraph-1'>{featuredDescription}</div>
      </div>
    </div>
  );
}
