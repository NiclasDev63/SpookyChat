import Contact from "./Contact/Contact";
import { doc} from "firebase/firestore";
import db from "../../utils/firebase/Firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

interface ContactsProps {
  getContactName: (contactName: {name: string, chatID: string}) => void;
}

const Contacts: React.FC<ContactsProps> = (props) => {
  const username = useContext(UserContext);

  const user = username === null ? "Anonymous" : username.username;

  const getContactName = (contact: {name: string, chatID: string}) => {
    props.getContactName(contact);
  };

  const contactRef = doc(db, "Member", user);
  const [contactSnapshot, contactLoading, contactError] =
  useDocumentData(contactRef);

  return (
    <>
      {contactSnapshot?.Contacts.map((contact: any) => (
        <Contact key={contact.name} chatID={contact.chatID} getContactName={getContactName} name={contact.name} />
      ))}
    </>
  );
};

export default Contacts;
