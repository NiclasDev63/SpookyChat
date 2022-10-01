import styles from "./Message.module.css";

export interface MessageProps {
  message: string;
  timestamp: string;
  sender: string;
  username: string;
}

const Message: React.FC<MessageProps> = (props) => {
  const classN = props.sender !== props.username
    ? `${styles.message} ${styles.received}`
    : `${styles.message} ${styles.send}`;

  return (
    <div className={classN}>
      <span className={styles.content}>
        {props.message}
        <span className={styles.timestamp}>{props.timestamp}</span>
      </span>
    </div>
  );
};

export default Message;
