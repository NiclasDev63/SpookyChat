import type { NextApiRequest, NextApiResponse } from "next";
import { setDoc, doc, serverTimestamp, FieldValue } from "firebase/firestore";
import db from "../../utils/firebase/Firebase";
import sha256 from "../../utils/sha256";

const addMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const username: string = req.body.username;
    const contact: string = req.body.contact;
    const message: string = req.body.message;
    const receivied: boolean = req.body.received;
    const timestamp: FieldValue = serverTimestamp();
    const id = sha256(username + contact + message + timestamp + (Math.random() * 187).toString());


    await setDoc(doc(db, "Member", username, "Contacts", contact, "Messages", id), {
      message: message,
      receivied: receivied,
      timestamp: timestamp,
    });
    res.status(200).json({ message: "Message added" });
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};

export default addMessage;
