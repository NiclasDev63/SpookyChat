import type { NextApiRequest, NextApiResponse } from "next";
import { deleteDoc, doc, getDocs, collection, query } from "firebase/firestore";
import db from "../../utils/firebase/Firebase";

export const deleteMember = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "DELETE") {
    const username: string = req.body.username;

    const q = query(collection(db, "Member", username, "Contacts"));
    const querySnapshot = await getDocs(q);

    for (let i = 0; i < querySnapshot.size; i++) {
      let docRef = query(
        collection(
          db,
          "Member",
          querySnapshot.docs[i].id,
          "Contacts",
          username,
          "Messages"
        )
      );

      let querySnapshot2 = await getDocs(docRef);

      //Deletes all messages with the contact
      for (let j = 0; j < querySnapshot2.size; j++) {
        await deleteDoc(
          doc(
            db,
            "Member",
            querySnapshot.docs[i].id,
            "Contacts",
            username,
            "Messages",
            querySnapshot2.docs[j].id
          )
        );
      }

      //Deletes all contacts of the member
      await deleteDoc(
        doc(db, "Member", username, "Contacts", querySnapshot.docs[i].id)
      );
    }

    //Deletes the member
    await deleteDoc(doc(db, "Member", username));
    res.status(200).json({ message: "Member deleted" });
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};

export default deleteMember;
