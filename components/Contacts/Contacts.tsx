import Contact from "./Contact/Contact";
import { doc } from "firebase/firestore";
import db from "../../utils/firebase/Firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useContext, useState, useCallback } from "react";
import UserContext from "../../context/UserContext";

interface ContactsProps {
  getContactName: (contactName: { name: string; chatID: string }) => void;
}

const Contacts: React.FC<ContactsProps> = (props) => {
  const username = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [newcontactFrom, setnewcontactFrom] = useState<{
    name: string;
    chatID: string;
  }>({ name: "", chatID: "" });

  const user = username === null ? "Anonymous" : username.username;

  const getContactName = (contact: { name: string; chatID: string }) => {
    setCurrentUser(contact.name);
    props.getContactName(contact);
  };

  const getNewMessage = useCallback((contact: { name: string; chatID: string }) => {
    setnewcontactFrom(contact);
  }, []);

  const contactRef = doc(db, "Member", user);
  const [contactSnapshot, contactLoading, contactError] =
    useDocumentData(contactRef);

  if (newcontactFrom.name !== "") {
    const index = contactSnapshot?.Contacts.findIndex(
      (contact: any) => contact.name === newcontactFrom.name
    );
    if (index !== -1) {
      contactSnapshot?.Contacts.splice(index, 1);
      contactSnapshot?.Contacts.unshift(newcontactFrom);
    }
  }

  return (
    <>
      {contactSnapshot?.Contacts.map((contact: any) => (
        <Contact
          key={contact.name}
          chatID={contact.chatID}
          getContactName={getContactName}
          getNewMessage={getNewMessage}
          name={contact.name}
          currentUser={currentUser}
        />
      ))}
    </>
  );
};

export default Contacts;
