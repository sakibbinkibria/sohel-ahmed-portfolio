import "./FeaturedWork.css";
import React, { useEffect, useState } from "react";
import ImageModal from "../components/ImageModal";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function FeaturedWork() {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      const snapshot = await getDocs(collection(db, "featured"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeaturedItems(data);
    };
    fetchFeatured();
  }, []);

  return (
    <>
      <section className="featured-work" id="featured">
        <h2>Featured Work</h2>
        {featuredItems.map((work, index) => (
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
              onClick={() => setSelectedAlbum(work.images)}
              style={{ cursor: "pointer" }}
            >
              <img src={work.images?.[0]} alt={work.title} />
              {/* <div className="caption">{work.title}</div> */}
            </div>
          </div>
        ))}

        <div className="view-more">
          <span>View More →</span>
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
