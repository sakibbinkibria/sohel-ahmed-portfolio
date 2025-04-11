import React, { useState, useEffect } from "react";
import "./Gallery.css";
import ImageModal from "../components/ImageModal";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      const snapshot = await getDocs(collection(db, "albums"));
      const fetchedAlbums = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAlbums(fetchedAlbums);
    };

    fetchAlbums();
  }, []);

  const handlePolaroidClick = (album) => {
    setSelectedAlbum(album);
    setIsModalOpen(true);
  };

  return (
    <section className="gallery-section" id="gallery">
      <h2 className="featured-work">Gallery</h2>
      <div className="gallery-grid">
        {albums.map((item, index) => (
          <div
            key={item.id || index}
            className="gallery-polaroid"
            onClick={() => handlePolaroidClick(item.images)}
          >
            <img
              src={item.images?.[0]}
              alt={item.title}
              className="gallery-polaroid-img"
            />
            <div className="gallery-polaroid-caption">{item.title}</div>
          </div>
        ))}
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={selectedAlbum}
      />
    </section>
  );
}
