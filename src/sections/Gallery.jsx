import React, { useState } from "react";
import "./Gallery.css";
import ImageModal from "../components/ImageModal";
import work1 from "../assets/work1.jpg";

const galleryItems = [
  {
    title: "Nature Trails",
    cover: work1,
    album: [work1, work1, work1],
  },
  {
    title: "Urban Vibes",
    cover: work1,
    album: [work1, work1, work1],
  },
  {
    title: "Wilderness",
    cover: work1,
    album: [work1, work1, work1],
  },
  {
    title: "Coastal Calm",
    cover: work1,
    album: [work1, work1, work1],
  },
  {
    title: "Desert Glow",
    cover: work1,
    album: [work1, work1, work1],
  },
  {
    title: "Mountain Mist",
    cover: work1,
    album: [work1, work1, work1],
  },
];

export default function Gallery() {
  const [selectedAlbum, setSelectedAlbum] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePolaroidClick = (album) => {
    setSelectedAlbum(album);
    setIsModalOpen(true);
  };

  return (
    <section className="gallery-section" id="gallery">
      <h2 className="featured-work">Gallery</h2>
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <div
            key={index}
            className="gallery-polaroid"
            onClick={() => handlePolaroidClick(item.album)}
          >
            <img src={item.cover} alt={item.title} className="gallery-polaroid-img" />
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
