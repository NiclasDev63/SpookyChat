import styles from "./Message.module.css";

export interface MessageProps {
  message: string;
  timestamp: string;
  received: boolean;
}

const Message: React.FC<MessageProps> = (props) => {
  const classN = props.received
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
