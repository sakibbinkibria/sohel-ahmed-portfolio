import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import "./UploadPanel.css";
import { useEffect } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";

export default function UploadPanel() {
  // Shared state
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  // Gallery state
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);

  // Featured Work state
  const [featuredTitle, setFeaturedTitle] = useState("");
  const [featuredDescription, setFeaturedDescription] = useState("");
  const [featuredImages, setFeaturedImages] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        history.push("/login");
      }
    });
    return () => unsubscribe();
  }, [history]);


  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "album photos"); // Change this
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dyrniubhl/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.secure_url;
  };

  const handleGalleryUpload = async () => {
    if (!galleryTitle || galleryImages.length === 0) {
      setMessage("Provide a title and images for the gallery.");
      return;
    }

    try {
      setUploading(true);
      const urls = await Promise.all(
        galleryImages.map((img) => uploadToCloudinary(img))
      );

      await addDoc(collection(db, "albums"), {
        title: galleryTitle,
        images: urls,
        createdAt: new Date(),
      });

      setMessage("Gallery upload complete!");
      setGalleryTitle("");
      setGalleryImages([]);
    } catch (err) {
      console.error(err);
      setMessage("Error uploading gallery images.");
    } finally {
      setUploading(false);
    }
  };

  const handleFeaturedUpload = async () => {
    if (!featuredTitle || !featuredDescription || featuredImages.length === 0) {
      setMessage("Provide title, description, and images for featured work.");
      return;
    }

    try {
      setUploading(true);
      const urls = await Promise.all(
        featuredImages.map((img) => uploadToCloudinary(img))
      );

      await addDoc(collection(db, "featured"), {
        title: featuredTitle,
        description: featuredDescription,
        images: urls,
        createdAt: new Date(),
      });

      setMessage("Featured work upload complete!");
      setFeaturedTitle("");
      setFeaturedDescription("");
      setFeaturedImages([]);
    } catch (err) {
      console.error(err);
      setMessage("Error uploading featured work.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-panel">
      <h2>Upload to Gallery</h2>
      <input
        type="text"
        placeholder="Gallery Title"
        value={galleryTitle}
        onChange={(e) => setGalleryTitle(e.target.value)}
      />
      <input type="file" multiple onChange={(e) => setGalleryImages([...e.target.files])} />
      <button onClick={handleGalleryUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Gallery"}
      </button>

      <hr style={{ margin: "2rem 0", borderColor: "#444" }} />

      <h2>Upload Featured Work</h2>
      <input
        className="upload-input"
        type="text"
        placeholder="Featured Title"
        value={featuredTitle}
        onChange={(e) => setFeaturedTitle(e.target.value)}
      />
      <textarea
        className="upload-input"
        placeholder="Featured Description"
        value={featuredDescription}
        onChange={(e) => setFeaturedDescription(e.target.value)}
        rows={4}
      />
      <input type="file" multiple onChange={(e) => setFeaturedImages([...e.target.files])} />
      <button onClick={handleFeaturedUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Featured Work"}
      </button>

      {message && <p className="upload-message">{message}</p>}
    </div>
  );
}
