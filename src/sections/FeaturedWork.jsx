import "./FeaturedWork.css";
import React, { useState } from "react";
import ImageModal from "../components/ImageModal";


import work1 from "../assets/work1.jpg";
import work2 from "../assets/work2.jpg";
import work3 from "../assets/work3.jpg";
import work4 from "../assets/work4.jpg";
import work5 from "../assets/work5.jpg";

const featuredWorks = [
  {
    id: 1,
    title: "Sunset Serenity",
    description: "A peaceful evening captured along the shores of Santorini.",
    image: work1,
    album: [work1, work2, work3],
  },
  {
    id: 2,
    title: "Urban Silence",
    description: "The calm before the city wakes up. Taken during golden hour.",
    image: work2,
    album: [work1, work2, work3],
  },
  {
    id: 3,
    title: "Wilderness Bloom",
    description: "Wildflowers in their natural chaos, hidden in the hills.",
    image: work3,
    album: [work1, work2, work3],
  },
  {
    id: 4,
    title: "Faces of Time",
    description: "An old man's story carved into every wrinkle of his face.",
    image: work4,
    album: [work1, work2, work3],
  },
  {
    id: 5,
    title: "Desert Daydreams",
    description: "The endless dance of dunes under a blinding sun.",
    image: work5,
    album: [work1, work2, work3],
  },
];

export default function FeaturedWork() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  return (
    <>
      <section className="featured-work" id="featured">
        <h2>Featured Work</h2>
        {featuredWorks.map((work, index) => (
          <div
            className={`work-item ${index % 2 === 1 ? "reverse" : ""}`}
            key={work.id}
          >
            <div className="work-text">
              <h3>{work.title}</h3>
              <p>{work.description}</p>
            </div>
            <div
              className="polaroid"
              onClick={() => setSelectedAlbum(work.album)}
              style={{ cursor: "pointer" }}
            >
              <img src={work.image} alt={work.title} />
              <div className="caption">{work.title}</div>
            </div>
          </div>
        ))}

        <div className="view-more">
          <a href="#">View More →</a>
        </div>
      </section>

      <ImageModal
        isOpen={selectedAlbum !== null}
        images={selectedAlbum || []}
        onClose={() => setSelectedAlbum(null)}
      />
    </>
  );
}
