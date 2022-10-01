import styles from "./Contact.module.css";
import { doc } from "firebase/firestore";
import db from "../../../utils/firebase/Firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useContext } from "react";
import UserContext from "../../../context/UserContext";
import { BsCheckAll } from "react-icons/bs";

export interface ContactPropsOutside {
  name: string;
  lastMessage: string;
  timestamp: string;
}

export interface ContactProps {
  name: string;
  chatID: string;
  getContactName: (contactName: {name: string, chatID: string}) => void;
}

const Contact: React.FC<ContactProps> = (props) => {
  const onClickHandler = () => {
    props.getContactName({name: props.name, chatID: props.chatID});
  };

  const username = useContext(UserContext);

  const user = username === null ? "Anonymous" : username.username;

  const chatRef = doc(db, "Chats", props.chatID);
  const [contactSnapshot, contactLoading, contactError] =
  useDocumentData(chatRef);
  const lastMessage = contactSnapshot?.lastMessage;
  const timestamp = lastMessage && new Date(lastMessage.timestamp).toLocaleString();
    return (
      <>
      {lastMessage && <div className={styles.contact} onClick={onClickHandler}>
        <div className={styles.picture}></div>
        <div className={styles.info}>
          <div className={styles.header}>
            <h1 className={styles.contactName}>{props.name}</h1>
            <span className={styles.timestamp}>{timestamp}</span>
          </div>
          <div className={styles.message}>
            <span className={styles.lastMessage}>{lastMessage.message}</span>
            {lastMessage.sender === user && (
                <span className={styles.sendIconContainer}><BsCheckAll className={styles.sendIcon}/></span>
            )}
          </div>
        </div>
      </div>}
      </>
    );
  }

export default Contact;
