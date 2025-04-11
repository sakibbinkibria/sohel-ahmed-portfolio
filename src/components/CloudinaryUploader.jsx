// components/CloudinaryUploader.jsx
import React from "react";

export default function CloudinaryUploader({ onUpload }) {
  const openWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dyrniubhl", // Replace with yours
        uploadPreset: "YOUR_UNSIGNED_UPLOAD_PRESET", // Replace with yours
        sources: ["local", "url", "camera"],
        multiple: true,
        folder: "portfolio_albums",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          onUpload(result.info.secure_url);
        }
      }
    );
  };

  return <button onClick={openWidget}>Upload Image</button>;
}
