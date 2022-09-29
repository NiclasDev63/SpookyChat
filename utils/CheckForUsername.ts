import db from "./firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";

const checkForUsername = async (username: string | undefined): Promise<boolean> => {
  if (username) {
    const docRef = doc(db, "Member", username);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export default checkForUsername;
