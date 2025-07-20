import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./AlbumView.css";

export default function AlbumView() {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);

    useEffect(() => {
        const fetchAlbum = async () => {
            const snap = await getDoc(doc(db, "albums", id));
            if (snap.exists()) setAlbum(snap.data());
        };
        fetchAlbum();
    }, [id]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (currentIndex !== null) {
                if (e.key === "ArrowRight") setCurrentIndex((i) => (i + 1) % album.images.length);
                if (e.key === "ArrowLeft") setCurrentIndex((i) => (i - 1 + album.images.length) % album.images.length);
                if (e.key === "Escape") setCurrentIndex(null);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex, album]);

    if (!album) return <p>Loading album...</p>;

    return (
        <div className="album-view-landing">
            <h2 className="album-title-heading">{album.title}</h2>
            <div className="album-images-grid">
                {album.images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img.url}
                        alt={`img-${idx}`}
                        onClick={() => setCurrentIndex(idx)}
                        className="album-image"
                    />
                ))}
            </div>

            {currentIndex !== null && (
                <div className="album-slider-overlay" onClick={() => setCurrentIndex(null)}>
                    <img
                        src={album.images[currentIndex].url}
                        className="album-slider-img"
                        onClick={(e) => e.stopPropagation()}
                        alt={`slide-${currentIndex}`}
                    />
                    <button
                        className="album-slider-nav prev"
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex((i) => (i - 1 + album.images.length) % album.images.length);
                        }}
                    >
                        &#10094;
                    </button>

                    <button
                        className="album-slider-nav next"
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex((i) => (i + 1) % album.images.length);
                        }}
                    >
                        &#10095;
                    </button>

                </div>
            )}
        </div>
    );
}
