// // src/firebase/firestoreService.js
// import { db } from "./firebase";
// import { collection, addDoc } from "firebase/firestore";

// export const addAlbum = async (albumData) => {
//   try {
//     const docRef = await addDoc(collection(db, "albums"), albumData);
//     console.log("Document written with ID: ", docRef.id);
//     return docRef.id;
//   } catch (e) {
//     console.error("Error adding document: ", e);
//     throw e;
//   }
// };
