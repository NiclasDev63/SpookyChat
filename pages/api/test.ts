import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../utils/firebase/Firebase";
import { updateDoc, doc, arrayUnion, setDoc, getDoc, query, collection, where, getDocs, orderBy } from "firebase/firestore";
import sha256 from "../../utils/sha256";

const test = async (req: NextApiRequest, res: NextApiResponse) => {

  const username: string = req.body.username;

  const contactRef = doc(db, "Member", username);
  const contactSnap: any = await getDoc(contactRef);

  const contacts = [];
  const contacts2 = [];
  for(const contact of contactSnap.data()?.Contacts) {
    const chatRef = doc(db, "Chats", contact.chatID);
    const chatSnapchot = await getDoc(chatRef);
    const data = chatSnapchot.data();
    console.log("Last Message", data?.lastMessage);
    console.log("chatID", data?.chatID);
    contacts.push({lastMassge: data?.lastMessage,chatID: data?.chatID, contact: contact.name, timestamp: data?.lastMessage.timestamp});
    contacts2.push({lastMassge: data?.lastMessage,chatID: data?.chatID, contact: contact.name, timestamp: data?.lastMessage.timestamp});
  }


  const bb = contacts.sort((a, b) => {
    return  b.timestamp - a.timestamp ;
  });

  console.log(contacts2)
  console.log(bb)

  

  res.status(200).json({ message: "Message added" });
};
export default test;
