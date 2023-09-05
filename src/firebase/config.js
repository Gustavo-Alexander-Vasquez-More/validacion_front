import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyBq2H_Z4gMt3-61bEoPI-sIH1K8DgAGEX4",
  authDomain: "validacion-de-licencias.firebaseapp.com",
  projectId: "validacion-de-licencias",
  storageBucket: "validacion-de-licencias.appspot.com",
  messagingSenderId: "730219621478",
  appId: "1:730219621478:web:050db20b9dbb3c763f91a7",
  measurementId: "G-NTM4X1BR56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); 

export async function subirArchivos(file){
    const storageRef = ref(storage, v4())
    await uploadBytes(storageRef, file)
    const url= await getDownloadURL(storageRef)
    return url
}