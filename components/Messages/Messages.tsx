import Message from "./Message/Message";
import { collection, query, limit, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import db from "../../utils/firebase/Firebase";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

interface MessagesProps {
  contactName: string;
}

const Messages: React.FC<MessagesProps> = (props) => {
  const username = useContext(UserContext);

  const user = username === null ? "Anonymous" : username.username;

  const messageRef = collection(
    db,
    "Member",
    user,
    "Contacts",
    props.contactName,
    "Messages"
  );
  const q = query(messageRef, orderBy("timestamp", "asc"), limit(25));
  const [snapshot, loading, error] = useCollection(q);
  const allMessages = snapshot?.docs.map((doc) => doc.data());

  return (
    <>
      {allMessages?.map((message, index) => (
        <Message
          key={index}
          message={message.message}
          timestamp={new Date(
            message.timestamp.seconds * 1000
          ).toLocaleString()}
          received={message.received}
        />
      ))}
    </>
  );
};

export default Messages;
