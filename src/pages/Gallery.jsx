import React from 'react';
import Navbar from '../components/Navbar';
import './Gallery.css';

export default function Gallery() {
    // const [selectedSection, setSelectedSection] = useState(null);
    return (
        <div className="gallery-landing">
            <Navbar />
                <div className="gallery-choice">
                    <div className="gallery-panel wedding">
                        <div className="overlay">
                            <h2>Explore Wedding</h2>
                        </div>
                    </div>
                    <div className="gallery-panel fashion">
                        <div className="overlay">
                            <h2>Explore Fashion</h2>
                        </div>
                    </div>
                </div>
        </div>
    );
}
