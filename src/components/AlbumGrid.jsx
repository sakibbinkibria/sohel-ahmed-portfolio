import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import "./AlbumGrid.css";

export default function AlbumGrid({ category }) {
  const [albums, setAlbums] = useState([]);
  const history = useHistory();

  const handleAlbumClick = (albumId) => {
    history.push(`/album/${albumId}`);
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      const q = query(collection(db, "albums"), where("category", "==", category));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAlbums(data);
    };

    fetchAlbums();
  }, [category]);

  return (
    <div className="album-grid-landing">
      <Navbar />
      <h1 className="album-grid-heading">{category} Albums</h1>
      <div className="album-grid">
        {albums.map((album) => (
          <div
            key={album.id}
            className="album-thumbnail"
            onClick={() => handleAlbumClick(album.id)}
          >
            <img
              src={album.images[0]?.url}
              alt={album.title}
              className="album-cover"
            />
            <div className="album-title">{album.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
