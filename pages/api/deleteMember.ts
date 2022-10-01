import type { NextApiRequest, NextApiResponse } from "next";
import {
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  collection,
  query,
  where,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
import db from "../../utils/firebase/Firebase";

export const deleteMember = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "DELETE") {
    const username: string = req.body.username;

    const q = query(
      collection(db, "Chats"),
      where("users", "array-contains", username)
    );
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => doc.data().users);
    for (const user of users) {
      let usr = user.find((usr: any) => usr != username);
      const docRef = doc(db, "Member", usr);
      const docSnap = await getDoc(docRef);
      const data: any = docSnap.data()?.Contacts;
      const chatID = data.find(
        (contact: any) => contact.name == username
      ).chatID;
      await updateDoc(docRef, {
        Contacts: arrayRemove({ name: username, chatID }),
      });
      await deleteDoc(doc(db, "Chats", chatID));
    }
    await deleteDoc(doc(db, "Member", username));

    res.status(200).json({ message: "Member deleted" });
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};

export default deleteMember;
