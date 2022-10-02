import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "process.env.APIKEY",
  authDomain: "process.env.AUTHDOMAIN",
  databaseURL:
    "process.env.DATABASEURL",
  projectId: "process.env.PROJECTID",
  storageBucket: "process.env.STORAGEBUCKET",
  messagingSenderId: "process.env.MESSAGINGSENDERID",
  appId: "process.env.APPID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
