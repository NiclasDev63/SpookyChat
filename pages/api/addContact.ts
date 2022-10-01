import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../utils/firebase/Firebase";
import {
  updateDoc,
  doc,
  arrayUnion,
  setDoc,
  getDoc,
} from "firebase/firestore";
import sha256 from "../../utils/sha256";

const addContact = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const username: string = req.body.username;
    const contactToAdd: string = req.body.contact;
    const chatID: string = sha256(username + contactToAdd);
    const message: string = `${username} started a chat`;
    const timestamp: number = Date.now();

    const docRef1 = doc(db, "Member", username);
    const docSnap = await getDoc(docRef1);
    const data: any = docSnap.data()?.Contacts;
    const index = data.findIndex(
      (contact: any) => contact.name == contactToAdd
    );
    if (index === -1) {
      // Add contact to user
      await updateDoc(docRef1, {
        Contacts: arrayUnion({ name: contactToAdd, chatID}),
      });

      // Add user to contact
      const docRef2 = doc(db, "Member", contactToAdd);
      await updateDoc(docRef2, {
        Contacts: arrayUnion({ name: username, chatID
        }),
      });

      // Creates chat between user and contact
      await setDoc(doc(db, "Chats", chatID), {
        chatID,
        users: [username, contactToAdd],
        messages: [{ message, timestamp, sender: username }],
        lastMessage: { message, timestamp, sender: username },
      });
      res.status(200).json({ message: "Contact added" });
    } else {
      res.status(400).json({ message: "Contact already added" });
    }
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};

export default addContact;
