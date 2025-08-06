import React, { useEffect, useState } from "react";
import './About.css'; // We'll add styles here
import Navbar from "../components/Navbar";

const About = () => {
    const [isAboutPage, setIsAboutPage] = useState(false);
    useEffect(() => {
        setIsAboutPage(window.location.pathname === '/about')
    }, []);
    return (
        <div
            className="about-container"
            style={{
                padding: isAboutPage ? '20px' : '0px',
                display: isAboutPage ? 'flex' : 'block',
                flexDirection: isAboutPage ? 'column' : 'unset',
                alignItems: isAboutPage ? 'center' : 'unset',
            }}
        >
            {isAboutPage && <Navbar />}

            <div className="about-content">
                <span className='header-text'>Welcome</span>
                <img
                    src="/sohel pro pic.jpg"
                    alt="Sohel Profile"
                    className="about-image"
                />
                <p>Welcome to our photography website! We are passionate about capturing moments and telling stories through our lens. Our team of skilled photographers specializes in various genres, including weddings, fashion, portraits, and more.</p>
                <p>With years of experience and a keen eye for detail, we strive to deliver stunning images that resonate with our clients. Whether you're looking for a photographer for your special day or want to explore our portfolio, we invite you to connect with us.</p>
                <p>Thank you for visiting our site, and we look forward to working with you!</p>
                <p>Welcome to our photography website! We are passionate about capturing moments and telling stories through our lens. Our team of skilled photographers specializes in various genres, including weddings, fashion, portraits, and more.</p>
                <p>With years of experience and a keen eye for detail, we strive to deliver stunning images that resonate with our clients. Whether you're looking for a photographer for your special day or want to explore our portfolio, we invite you to connect with us.</p>
                <p>Thank you for visiting our site, and we look forward to working with you!</p>
            </div>
        </div>
    );
};

export default About;
