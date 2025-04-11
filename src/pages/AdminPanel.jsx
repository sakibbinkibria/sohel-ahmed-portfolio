import { addAlbum } from "../firebase/firestoreService";

const handleSubmit = async () => {
  // After uploading images to Cloudinary...
  const albumData = {
    title: title,
    coverUrl: coverImageUrl,
    albumUrls: uploadedImageUrls,
    category: selectedCategory, // optional
  };

  await addAlbum(albumData);
  alert("Album uploaded and saved to database!");
};
