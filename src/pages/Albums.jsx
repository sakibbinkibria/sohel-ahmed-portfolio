import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ImageModal from "../components/ImageModal";
import "./Albums.css";

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const querySnapshot = await getDocs(collection(db, "albums"));
      const albumData = querySnapshot.docs.map(doc => doc.data());
      setAlbums(albumData);
    };
    fetchAlbums();
  }, []);

  const openModal = (images) => {
    setSelectedImages(images);
    setIsModalOpen(true);
  };

  return (
    <section className="albums-section">
      <h2 className="section-heading">Uploaded Albums</h2>
      <div className="albums-grid">
        {albums.map((album, index) => (
          <div
            key={index}
            className="albums-polaroid"
            onClick={() => openModal(album.images)}
          >
            <img src={album.images[0]} alt={album.title} className="albums-polaroid-img" />
            <div className="albums-polaroid-caption">{album.title}</div>
          </div>
        ))}
      </div>
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={selectedImages}
      />
    </section>
  );
}
