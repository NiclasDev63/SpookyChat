import { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import styles from "./index.module.css";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import Messages from "../../components/Messages/Messages";
import Contacts from "../../components/Contacts/Contacts";
import sendMessage from "../../utils/sendMessage";
import checkForUsername from "../../utils/CheckForUsername";
import { useRouter } from "next/router";

const Chats = () => {
  const username = useContext(UserContext);
  const [message, setMessage] = useState<string>("");
  const [currentContact, setCurrentContact] = useState<{
    chatID: string;
    contactName: string;
  }>({ chatID: "", contactName: "" });
  const [showMessages, setShowMessages] = useState<boolean>(false);
  const [addContact, setAddContact] = useState<string>("");
  const [contacExists, setContactExists] = useState<boolean>(true);
  const router = useRouter();

  const messageSendHandler = async () => {
    if (
      message !== "" &&
      username !== null &&
      currentContact.contactName !== ""
    ) {
      await sendMessage(username?.username,  message, currentContact.chatID);
      setMessage("");
    }
  };

  const addContactHandler = async () => {
    if (addContact !== "" && username !== null) {
      const checkContactName = await checkForUsername(addContact);
      if (checkContactName) {
        await fetch("/api/addContact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username?.username,
            contact: addContact,
          }),
        });
        setContactExists(true);
        setAddContact("");
      } else {
        setContactExists(false);
      }
    }
  };

  useEffect(() => {
    if (username?.username !== null && currentContact.chatID !== "") {
      setShowMessages(true);
    }
  }, [username, currentContact]);

  useEffect(() => {
    if (username?.username !== null) {
      setCurrentContact({ chatID: "", contactName: "" });
      setShowMessages(false);
    }
  }, [username?.username]);

  const getContactName = (contact: { name: string; chatID: string }) => {
    let contactObject = {
      chatID: contact.chatID,
      contactName: contact.name,
    };
    setCurrentContact(contactObject);
  };

  const logoutHandler = () => {
    username?.onLogout();
    router.push("/");
  };
  return (
    <AuthWrapper>
      <div className={styles.container}>
        <h1 className={styles.user}>Currently logged in as: {username?.username}</h1>
        <div className={styles.chatContainer}>
          <div className={styles.leftSection}>
            <Button
              text="Logout"
              className={styles.logout}
              onClick={logoutHandler}
            />
            <div className={styles.addContactSection}>
              <div className={styles.newChat}>
                <InputField
                  placeholder="Username"
                  className={styles.searchField}
                  onChange={(e) => setAddContact(e.target.value)}
                  value={addContact}
                />
                <Button
                  text="Start New Conversation"
                  className={styles.searchButton}
                  onClick={addContactHandler}
                />
              </div>
              {!contacExists && (
                <span className={styles.userNotFound}>
                  Contact does not exists
                </span>
              )}
            </div>
            <div className={styles.chats}>
              <Contacts getContactName={getContactName} />
            </div>
          </div>
          <div className={styles.chat}>
            <div className={styles.chatHeader}>
              <div className={styles.contact}>
                <div className={styles.picture}></div>
                <div className={styles.info}>
                  <h1 className={styles.contactName}>
                    {currentContact.contactName}
                  </h1>
                </div>
              </div>
            </div>
            <div className={styles.chatBody}>
              {showMessages && <Messages chatID={currentContact.chatID} />}
            </div>
            <div className={styles.inputSection}>
              <InputField
                placeholder="Write a message"
                className={styles.messageInput}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    messageSendHandler();
                  }
                }}
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
