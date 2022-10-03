import styles from "./Contact.module.css";
import { doc } from "firebase/firestore";
import db from "../../../utils/firebase/Firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../../context/UserContext";
import { BsCheckAll } from "react-icons/bs";

export interface ContactPropsOutside {
  name: string;
  lastMessage: string;
  timestamp: string;
  currentUser: string;
}

export interface ContactProps {
  name: string;
  chatID: string;
  currentUser: string;
  getContactName: (contactName: { name: string; chatID: string }) => void;
  getNewMessage: (contactName: { name: string; chatID: string }) => void;
}

const Contact: React.FC<ContactProps> = (props) => {
  const username = useContext(UserContext);
  const [newMessage, setNewMessage] = useState<boolean>(false);
  const { name, chatID, currentUser, getContactName, getNewMessage } = props;

  const onClickHandler = () => {
    setNewMessage(false);
    getContactName({ name: name, chatID: chatID });
  };

  const user = username === null ? "Anonymous" : username.username;

  const chatRef = doc(db, "Chats", chatID);
  const [contactSnapshot, contactLoading, contactError] =
    useDocumentData(chatRef);

  useEffect(() => {
    if (contactSnapshot?.lastMessage.sender !== user && currentUser !== name) {
      setNewMessage(true);
    }
    getNewMessage({ name, chatID });
  }, [
    contactSnapshot?.lastMessage,
    user,
    name,
    chatID,
    currentUser,
    getNewMessage,
  ]);

  const lastMessage = contactSnapshot?.lastMessage;
  const timestamp =
    lastMessage && new Date(lastMessage.timestamp).toLocaleString();
  return (
    <>
      {lastMessage && (
        <div className={styles.contact} onClick={onClickHandler}>
          <div className={styles.picture}></div>
          <div className={styles.info}>
            <div className={styles.header}>
              <h1 className={styles.contactName}>{name}</h1>
              <span className={styles.timestamp}>{timestamp}</span>
            </div>
            <div className={styles.message}>
              <span className={styles.lastMessage}>{lastMessage.message}</span>
              {lastMessage.sender === user && (
                <span className={styles.sendIconContainer}>
                  <BsCheckAll className={styles.sendIcon} />
                </span>
              )}
              {newMessage && <span className={styles.newMessage}></span>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
