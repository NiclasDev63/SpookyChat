import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwxo-pUgfYjeFv3Fh_hJrN-M4pEd4jXZE",
  authDomain: "niclas-test-app.firebaseapp.com",
  databaseURL:
    "https://niclas-test-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "niclas-test-app",
  storageBucket: "niclas-test-app.appspot.com",
  messagingSenderId: "748026565388",
  appId: "1:748026565388:web:94ca4fddce1c075388af29",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
