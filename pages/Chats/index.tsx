import { useState, useContext, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import db from "../../utils/firebase/Firebase";
import { collection, query, limit, orderBy } from "firebase/firestore";
import UserContext from "../../context/UserContext";
import checkForUsername from "../../utils/CheckForUsername";
import styles from "./index.module.css";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";

const Chats = () => {
  const [userNameExists, setUserNameExists] = useState<boolean>(false);
  const username = useContext(UserContext);

  // useEffect(() => {
  //   const checkUsername = async () => {
  //     const result = await checkForUsername(username?.username);
  //     setUserNameExists(result);
  //   };
  //   checkUsername();
  // }, [username?.username]);

  // const user = username === null ? "Anonymous" : username.username;

  // //get all contacts
  // const contactRef = collection(db, "Member", user, "Contacts");
  // const [contactSnapshot, contactLoading, contactError] =
  //   useCollection(contactRef);
  // const allContacts: string[] | undefined = contactSnapshot?.docs.map((doc) => doc.id);

  // // if (username?.username && userNameExists) {
  //   const messageRef = collection(
  //     db,
  //     "Member",
  //     user,
  //     "Contacts",
  //     "John",
  //     "Messages"
  //   );
  //   const q = query(messageRef, orderBy("timestamp", "desc"), limit(25));
  //   const [snapshot, loading, error] = useCollection(q);
  //   const allMessages: string[] | undefined = snapshot?.docs.map(
  //     (doc) => doc.data().message
  //   );

  return (
    // <div>
    //   { allMessages && allMessages?.map((message) => (
    //     <p>{message}</p>
    //   ))}
    //   { allContacts && allContacts?.map((message) => (
    //     <p>{message}</p>
    //   ))}
    // </div>
    <AuthWrapper>
      <div className={styles.container}>
        <div className={styles.chatContainer}>
          <div className={styles.leftSection}>
          <Button
                text="Logout"
                className={styles.logout}
              />
            <div className={styles.newChat}>
              <InputField
                placeholder="Username"
                className={styles.searchField}
              />
              <Button
                text="Start New Conversation"
                className={styles.searchButton}
              />
            </div>
            <div className={styles.chats}>
              <div className={styles.contact}>
                <div className={styles.picture}></div>
                <div className={styles.info}>
                  <h1 className={styles.contactName}>Niclas63</h1>
                  <span className={styles.lastMessage}>Last Message</span>
                </div>
              </div>
              <div className={styles.contact}>
                <div className={styles.picture}></div>
                <div className={styles.info}>
                  <h1 className={styles.contactName}>John</h1>
                  <span className={styles.lastMessage}>Last Message</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.chat}>
            <div className={styles.chatHeader}>
              <div className={styles.contact}>
                <div className={styles.picture}></div>
                <div className={styles.info}>
                  <h1 className={styles.contactName}>Niclas63</h1>
                </div>
              </div>
            </div>
            <div className={styles.chatBody}>
              <p className={`${styles.message} ${styles.send}`}>TEST</p>
              <p className={`${styles.message} ${styles.received}`}>
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
              </p>
              <p className={`${styles.message} ${styles.send}`}>TEST</p>
              <p className={`${styles.message} ${styles.received}`}>TEST</p>
              <p className={`${styles.message} ${styles.send}`}>TEST</p>
              <p className={`${styles.message} ${styles.received}`}>TEST</p>
              <p className={`${styles.message} ${styles.send}`}>TEST</p>
              <p className={`${styles.message} ${styles.received}`}>TEST</p>
              <p className={`${styles.message} ${styles.send}`}>TEST</p>
              <p className={`${styles.message} ${styles.send}`}>
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
              </p>
            </div>
            <div className={styles.inputSection}>
              <InputField
                placeholder="Write a message"
                className={styles.messageInput}
              />
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className={styles.sendMessage}
              >
                <path d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Chats;
