import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase/firebase";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { getDoc } from "firebase/firestore";
import "./UploadPanel.css";

/* ---------- Cloudinary helper ---------- */
const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "album photos");

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/dyrniubhl/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Cloudinary response:", data); // 🔍 This shows the detailed error

    if (!res.ok) {
      throw new Error(data?.error?.message || "Upload failed");
    }

    return {
      url: data.secure_url,
      public_id: data.public_id,
    };
  } catch (err) {
    console.error("Cloudinary Upload Error:", err.message);
    throw err;
  }
};


export default function UploadPanel() {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [cellUploading, setCellUploading] = useState(Array(9).fill(false));
  const [featuredDocs, setFeaturedDocs] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const fileInputs = useRef([]);

  const fetchFeatured = async () => {
    const docRef = doc(db, "featured", "main");
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      setFeaturedDocs(data.images || []);
      setFeaturedDescription(data.description || "");
    } else {
      setFeaturedDocs([]);
      setFeaturedDescription("");
    }
  };
  
  /* redirect unauthenticated users */
  useEffect(() => {
    const un = onAuthStateChanged(auth, (u) => !u && history.push("/login"));

    const fetchCellImages = async () => {
      const newImages = [];
      for (let i = 0; i < 9; i++) {
        const docRef = doc(db, "heroGrid", `cell${i}`);
        const snap = await getDoc(docRef);
        newImages.push(snap.exists() ? snap.data().images || [] : []);
      }
      setCellImages(newImages);
    };

    fetchCellImages();
    fetchFeatured();
    return un;
  }, [history]);


  /* ------------- Gallery & Featured upload (unchanged) ------------- */
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [featuredDescription, setFeaturedDescription] = useState("");
  const [featuredImages, setFeaturedImages] = useState([]);
  const [cellImages, setCellImages] = useState(Array(9).fill([]));


  const handleGalleryUpload = async () => {
    if (!galleryTitle || galleryImages.length === 0) return setMessage("Give gallery title & images");
    try {
      setUploading(true);
      const urls = await Promise.all(galleryImages.map(uploadToCloudinary));
      await addDoc(collection(db, "albums"), {
        title: galleryTitle,
        images: urls,
        createdAt: new Date(),
      });
      setMessage("Gallery uploaded!");
      setGalleryTitle(""); setGalleryImages([]);
    } catch { setMessage("Gallery upload failed"); } finally { setUploading(false); }
  };

  const handleFeaturedUpload = async () => {
    if (featuredImages.length === 0) {
      return setMessage("Please select featured images to upload");
    }
    try {
      setUploading(true);
      const uploads = await Promise.all(
        featuredImages.map(({ file }) => uploadToCloudinary(file))
      );

      const docRef = doc(db, "featured", "main"); // single doc called 'main'
      const snap = await getDoc(docRef);
      const existingImages = snap.exists() ? snap.data().images || [] : [];

      const newImages = [...existingImages, ...uploads];

      await setDoc(docRef, {
        images: newImages,
        description: featuredDescription,
      });
      
      setMessage("Featured images uploaded!");
      setFeaturedDescription("");
      setFeaturedImages([]);
      fetchFeatured(); // refresh after upload
    } catch (err) {
      console.error(err);
      setMessage("Featured upload failed");
    } finally {
      setUploading(false);
    }
  };



  /* ------------- Hero grid upload ------------- */
  const handleCellSelect = (idx) => fileInputs.current[idx].click();

  const handleCellUpload = async (idx, files) => {
    if (!files.length) return;

    try {
      setCellUploading((prev) => prev.map((v, i) => (i === idx ? true : v)));
      const uploads = await Promise.all([...files].map(uploadToCloudinary));
      const updatedImages = [...cellImages[idx], ...uploads];

      await setDoc(doc(db, "heroGrid", `cell${idx}`), { images: updatedImages });
      setCellImages((prev) => prev.map((arr, i) => (i === idx ? updatedImages : arr)));
      setMessage(`Cell ${idx + 1} updated!`);
    } catch {
      setMessage(`Upload failed for cell ${idx + 1}`);
    } finally {
      setCellUploading((prev) => prev.map((v, i) => (i === idx ? false : v)));
    }
  };


  const handleRemoveImage = async (idx, image) => {
    try {
      // 1. Delete from Cloudinary
      await fetch("/.netlify/functions/deleteImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: image.public_id }),
      });

      // 2. Delete from Firestore
      const updatedImages = cellImages[idx].filter((img) => img.public_id !== image.public_id);
      await setDoc(doc(db, "heroGrid", `cell${idx}`), { images: updatedImages });
      setCellImages((prev) => prev.map((arr, i) => (i === idx ? updatedImages : arr)));
    } catch (err) {
      console.error("Failed to delete image:", err);
    }
  };

  const handleRemoveFeaturedImage = (imgToRemove) => {
    setFeaturedImages((prev) =>
      prev.filter((img) => img.url !== imgToRemove.url)
    );
  };

  const handleDeleteFeatured = async (imageToDelete) => {
    setDeleting(true);
    try {
      // 1. Delete from Cloudinary
      await fetch("/.netlify/functions/deleteImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: imageToDelete.public_id }),
      });

      // 2. Update Firestore document
      const updated = featuredDocs.filter(img => img.public_id !== imageToDelete.public_id);
      await setDoc(doc(db, "featured", "main"), { images: updated });

      setFeaturedDocs(updated);
    } catch (err) {
      console.error("Failed to delete featured image:", err);
    } finally {
      setDeleting(false);
    }
  };


  return (
    <div className="upload-panel">
      {/* ---------- Hero grid uploader ---------- */}
      <h2>Hero Grid Images</h2>
      <div className="grid-uploader">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div key={idx} className="grid-cell-block">
            <button
              className="grid-upload-btn"
              onClick={() => handleCellSelect(idx)}
              disabled={cellUploading[idx]}
            >
              {cellUploading[idx] ? "Uploading…" : `Cell ${idx + 1}`}
            </button>

            <div className="grid-thumbs">
              {cellImages[idx].map((img, imgIdx) => (
                <div key={imgIdx} className="grid-thumb-wrapper">
                  <img src={img.url} alt={`cell${idx}-${imgIdx}`} />
                  <button onClick={() => handleRemoveImage(idx, img)}>×</button>
                </div>
              ))}

            </div>
          </div>
        ))}
      </div>


      {/* hidden file inputs */}
      {Array.from({ length: 9 }).map((_, idx) => (
        <input
          key={idx}
          type="file"
          multiple
          style={{ display: "none" }}
          ref={(el) => (fileInputs.current[idx] = el)}
          onChange={(e) => handleCellUpload(idx, e.target.files)}
        />
      ))}

      <hr />

      {/* ---------- existing Gallery uploader ---------- */}
      <h2>Upload to Gallery</h2>
      <input type="text" placeholder="Gallery Title" value={galleryTitle} onChange={(e) => setGalleryTitle(e.target.value)} />
      <input type="file" multiple onChange={(e) => setGalleryImages([...e.target.files])} />
      <button onClick={handleGalleryUpload} disabled={uploading}>
        {uploading ? "Uploading…" : "Upload Gallery"}
      </button>

      <hr />

      {/* ---------- existing Featured Work uploader ---------- */}
      <h2>Upload Featured Work</h2>
      <textarea placeholder="Featured Description" rows={4} value={featuredDescription} onChange={(e) => setFeaturedDescription(e.target.value)} />
      <input
        type="file"
        multiple
        onChange={async (e) => {
          const files = [...e.target.files];
          const previews = await Promise.all(files.map(async (file) => {
            return {
              url: URL.createObjectURL(file),
              file,
              public_id: null, // temporary for client-side deletion
            };
          }));
          setFeaturedImages(previews);
        }}
      />
      <div className="grid-thumbs">
        {featuredImages.map((img, idx) => (
          <div key={idx} className="grid-thumb-wrapper">
            <img src={img.url} alt={`featured-${idx}`} />
            <button onClick={() => handleRemoveFeaturedImage(img)}>×</button>
          </div>
        ))}
      </div>
      <button onClick={handleFeaturedUpload} disabled={uploading}>
        {uploading ? "Uploading…" : "Upload Featured"}
      </button>

      {message && <p className="upload-message">{message}</p>}
      <h2>Featured Work Images</h2>
      <div className="grid-uploader">
        {featuredDocs.map((img, idx) => (
          <div key={idx} className="grid-thumb-wrapper">
            <img src={img.url} alt={`featured-${idx}`} className="grid-thumb-preview" />
            {!deleting && (
              <button
                onClick={() => handleDeleteFeatured(img)}
                className="grid-thumb-remove"
              >
                X
              </button>
            )}
            {deleting && <span>Deleting Image...</span>}
          </div>
        ))}
      </div>


    </div>
  );
}
