import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../utils/firebase/Firebase";
import { setDoc, doc } from "firebase/firestore";

const addContact = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const username: string = req.body.username;
    const contact: string = req.body.contact;

    await setDoc(doc(db, "Member", username, "Contacts", contact), {
      username: contact,
    });
    res.status(200).json({ message: "Contact added" });
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};

export default addContact;
