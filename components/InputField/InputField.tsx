import styles from "./InputField.module.css";

interface InputFieldProps {
  className?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  style?: React.CSSProperties;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  maxLength?: number;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const classN = [styles.inputField, props.className].join(" ");

  return <input {...props} className={classN} type="text" />;
};

export default InputField;
