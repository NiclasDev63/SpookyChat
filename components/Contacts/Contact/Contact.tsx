import styles from "./Contact.module.css";
import { collection, query, limit, orderBy } from "firebase/firestore";
import db from "../../../utils/firebase/Firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useContext } from "react";
import UserContext from "../../../context/UserContext";
import { AiOutlineCheck } from "react-icons/ai";

export interface ContactPropsOutside {
  name: string;
  lastMessage: string;
  timestamp: string;
}

export interface ContactProps {
  name: string;
  // lastMessage: string;
  // timestamp: string;
  getContactName: (contactName: string) => void;
}

const Contact: React.FC<ContactProps> = (props) => {
  const onClickHandler = () => {
    props.getContactName(props.name);
  };

  const username = useContext(UserContext);

  const user = username === null ? "Anonymous" : username.username;

  const messageRef = collection(
    db,
    "Member",
    user,
    "Contacts",
    props.name,
    "Messages"
  );
  const q = query(messageRef, orderBy("timestamp", "desc"), limit(1));
  const [snapshot, loading, error] = useCollection(q);
  if (snapshot) {
    let { message, timestamp, received } = snapshot?.docs[0].data();

    timestamp = new Date(timestamp * 1000).toLocaleString();

    return (
      <div className={styles.contact} onClick={onClickHandler}>
        <div className={styles.picture}></div>
        <div className={styles.info}>
          <div className={styles.header}>
            <h1 className={styles.contactName}>{props.name}</h1>
            <span className={styles.timestamp}>{timestamp}</span>
          </div>
          <div className={styles.message}>
            <span className={styles.lastMessage}>{message}</span>
            {!received && <AiOutlineCheck />}
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Contact;
