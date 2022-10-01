import db from "../../utils/firebase/Firebase";
import checkForUsername from "../../utils/CheckForUsername";

import type { NextApiRequest, NextApiResponse } from "next";

import { setDoc, doc } from "firebase/firestore";

export const addMember = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const username: string = req.body.username;
    const usernameExists = await checkForUsername(username);

    if (usernameExists) {
      res.status(400).json({ message: "Username already exists" });
    } else {
      await setDoc(doc(db, "Member", username), {
        username: username,
        accCreated: Date.now(),
        Contacts: [],
      });
      res.status(200).json({ message: "Member added" });
    }
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};

export default addMember;
