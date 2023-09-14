// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlCA7n6NMlwZl-Nmdr_EUQFH95QUzgowE",
  authDomain: "fotos-36c9a.firebaseapp.com",
  projectId: "fotos-36c9a",
  storageBucket: "fotos-36c9a.appspot.com",
  messagingSenderId: "726706294193",
  appId: "1:726706294193:web:5af4d048a4e800b8154190",
  measurementId: "G-HBZ6D7YLQR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)

export async function uploadFile(file) {
    const storageRef = ref(storage, v4());
  
    try {
      // Subir el archivo a Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);
  
      // Obtener la URL de descarga del archivo
      const downloadURL = await getDownloadURL(snapshot.ref);
  
      console.log( downloadURL);
      
      return downloadURL; // Devolver la URL de descarga
    } catch (error) {
      console.error("Error al cargar el archivo:", error);
      throw error;
    }
  }