import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../utils/firebase/Firebase";
import { updateDoc, doc, arrayUnion, setDoc, getDoc, query, collection, where, getDocs, orderBy } from "firebase/firestore";
import sha256 from "../../utils/sha256";

const test = async (req: NextApiRequest, res: NextApiResponse) => {

  const docRef = collection(db, "Members");
  const q = query(docRef, where("username", "==", "Niclas63"));
  const querySnapshot = await getDocs(q);

  

  res.status(200).json({ message: "Message added" });
};
export default test;
