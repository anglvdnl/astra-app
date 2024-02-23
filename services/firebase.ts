import {initializeApp} from "firebase/app";
import {getAuth} from "@firebase/auth";
import {getDoc, getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB0o__uy8KOZHq_Pe3IQ5uIQAhXtIM-MsU",
    authDomain: "astra-app-64b8e.firebaseapp.com",
    projectId: "astra-app-64b8e",
    storageBucket: "astra-app-64b8e.appspot.com",
    messagingSenderId: "619106748536",
    appId: "1:619106748536:web:98d6a61367371703c2458d",
    measurementId: "G-QLLCN7Z9GH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

// import {doc, setDoc} from "firebase/firestore";
//
// const docRef = doc(db, "users", "s8VzPriqy2VWtU1mvESW");
// getDoc(docRef).then(r => console.log(r.data())).catch(e => console.log(e));
//
// import { doc, updateDoc } from "firebase/firestore";
// import {defaultData} from "@/consts/defaultData";
//
// const washingtonRef = doc(db, "users", "uzQ3tLVHjQR9vGkZQdqEioBCSHV2");
//
// // Set the "capital" field of the city 'DC'
// updateDoc(washingtonRef, defaultData).then(r => console.log(r)).catch(e => console.log(e));