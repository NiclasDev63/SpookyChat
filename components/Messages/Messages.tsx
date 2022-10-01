import Message from "./Message/Message";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import db from "../../utils/firebase/Firebase";
import { useContext, useRef, useEffect } from "react";
import UserContext from "../../context/UserContext";

const sortByTimestamp = (a: number, b: number) => {
  return a > b;
};

interface MessagesProps {
  chatID: string;
}

const Messages: React.FC<MessagesProps> = (props) => {
  const username = useContext(UserContext);
  const dummy = useRef<HTMLSpanElement>(null);

  const user = username === null ? "Anonymous" : username.username;

  const messageRef = doc(db, "Chats", props.chatID);

  const messageSnapchot: any = useDocumentData(messageRef);
  const messages = messageSnapchot[0]?.messages.sort(sortByTimestamp);

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {messages?.map((message: any, index: number) => (
        <Message
          key={index}
          message={message.message}
          timestamp={new Date(message.timestamp).toLocaleString()}
          sender={message.sender}
          username={user}
        />
      ))}
      <span ref={dummy}></span>
    </>
  );
};

export default Messages;
