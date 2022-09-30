import { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import styles from "./index.module.css";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import { MessageProps } from "../../components/Messages/Message/Message";
import Messages from "../../components/Messages/Messages";
import { ContactPropsOutside } from "../../components/Contacts/Contact/Contact";
import Contacts from "../../components/Contacts/Contacts";
import sendMessage from "../../utils/sendMessage";

const date = new Date().getHours() + ":" + new Date().getMinutes();
const msgs: MessageProps[] = [
  {
    message: "Hello",
    timestamp: date,
    received: true,
  },
  {
    message:
      "HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHellol",
    timestamp: date,
    received: false,
  },
  {
    message: "Hello",
    timestamp: date,
    received: true,
  },
  {
    message: "Hello",
    timestamp: date,
    received: false,
  },
];



const Chats = () => {
  const [userNameExists, setUserNameExists] = useState<boolean>(false);
  const username = useContext(UserContext);
  const [message, setMessage] = useState<string>("");
  const [currentContact, setCurrentContact] = useState<string>("");
  const [showMessages, setShowMessages] = useState<boolean>(false);

  const messageSendHandler = async () => {
    if (message !== "" && username !== null) {
      await sendMessage(message, username?.username, "John");
      setMessage("");
    }
  };

  useEffect(() => {
    if (username?.username !== null && currentContact) {
      setShowMessages(true);
    }
  }, [username, currentContact]);
  

  const getContactName = (contactName: string) => {
    setCurrentContact(contactName);
  }

  console.log(currentContact);

  const cntcs: ContactPropsOutside[] = [
    {
      name: "John",
      lastMessage: "Hello",
      timestamp: date,
  
    },
    {
      name: "Niclas",
      lastMessage: "Hello",
      timestamp: date,
    },
    {
      name: "Tom",
      lastMessage: "Hello",
      timestamp: date,
    },
    {
      name: "Robert",
      lastMessage: "Hello",
      timestamp: date,
    },
  ];

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
            <Button text="Logout" className={styles.logout} />
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
              <Contacts contacts={cntcs} getContactName={getContactName}/>
            </div>
          </div>
          <div className={styles.chat}>
            <div className={styles.chatHeader}>
              <div className={styles.contact}>
                <div className={styles.picture}></div>
                <div className={styles.info}>
                  <h1 className={styles.contactName}>{currentContact}</h1>
                </div>
              </div>
            </div>
            <div className={styles.chatBody}>
              {showMessages && <Messages contactName={currentContact} />}
            </div>
            <div className={styles.inputSection}>
              <InputField
                placeholder="Write a message"
                className={styles.messageInput}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className={styles.sendMessage}
                onClick={messageSendHandler}
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
