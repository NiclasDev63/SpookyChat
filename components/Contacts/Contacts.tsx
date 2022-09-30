import Contact from "./Contact/Contact";
import { collection } from "firebase/firestore";
import db from "../../utils/firebase/Firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

interface ContactsProps {
  getContactName: (contactName: string) => void;
}

const Contacts: React.FC<ContactsProps> = (props) => {
  const username = useContext(UserContext);
  
  
  const user = username === null ? "Anonymous" : username.username;
  
  const getContactName = (contactName: string) => {
    props.getContactName(contactName);
  };
  
  const contactRef = collection(db, "Member", user, "Contacts");
  const [contactSnapshot, contactLoading, contactError] =
  useCollection(contactRef);
  if(contactSnapshot){

    const allContacts: string[] | undefined = contactSnapshot?.docs.map(
      (doc) => doc.id
      );
      

      return (
        <>
          {allContacts.map((contact, index) => (
            <Contact
              key={contact}
              getContactName={getContactName}
              name={contact}
            />
          ))}
        </>
      );
    } else {
    return <></>
  }


};

export default Contacts;

