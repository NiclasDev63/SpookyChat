import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  const classN = [styles.button, props.className].join(" ");

  return (
    <button {...props} className={classN}>
      {props.text}
    </button>
  );
};

export default Button;
