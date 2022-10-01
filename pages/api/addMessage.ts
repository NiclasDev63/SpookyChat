import type { NextApiRequest, NextApiResponse } from "next";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import db from "../../utils/firebase/Firebase";

const addMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const username: string = req.body.username;
    const message: string = req.body.message;
    const chatID: string = req.body.chatID;
    const timestamp: number = Date.now();

    const msgObj = {
      message: message,
      sender: username,
      timestamp: timestamp,
    };
    const docRef = doc(db, "Chats", chatID);
    await updateDoc(docRef, {
      messages: arrayUnion(msgObj),
      lastMessage: msgObj,
    });

    
    res.status(200).json({ message: "Message added" });
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};

export default addMessage;
