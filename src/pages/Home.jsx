import React from 'react';
//import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
// import FeaturedWork from '../sections/FeaturedWork';
// import Gallery from '../sections/Gallery';
// import MyStory from '../sections/MyStory';
import './Home.css'; // We'll add scroll snapping styles here

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <main className="snap-container">
        <Hero />
        {/* <FeaturedWork />
        <Gallery />
        <MyStory /> */}
      </main>
    </>
  );
};

export default Home;
