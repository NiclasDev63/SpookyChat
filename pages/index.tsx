import { useState, useEffect } from "react";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";

import UserContext from "../context/UserContext";
import { useContext } from "react";

import styles from "./index.module.css";
import { GiSpiderWeb } from "react-icons/gi";

import { useRouter } from "next/router";

import checkForUsername from "../utils/CheckForUsername";

const HomePage = () => {
  const username = useContext(UserContext);
  const [name, setName] = useState<string>("");
  const [usernameExists, setUsernameExists] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (usernameExists) {
      const interval = setInterval(() => {
        setUsernameExists(false);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [usernameExists]);

  const onClickHandler = async () => {
    username?.onLogin(name);
    const exists = await checkForUsername(name);
    if (exists) {
      setUsernameExists(true);
      return;
    }
    router.push("/Chats");
    setName("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>
            Spooky Chat <GiSpiderWeb className={styles.spider} />
          </h1>
          <h2 className={styles.slogan}>Chat with the dead</h2>
        </div>
        <InputField
          className={styles.inputFied}
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
          value={name}
          maxLength={16}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onClickHandler();
            }
          }}
        />
        {usernameExists && <span className={styles.error}>
          The username is already taken, please choose another one
        </span>}
        <Button
          text="Join Chat"
          className={styles.button}
          onClick={onClickHandler}
          
        />
      </div>
    </div>
  );
};

export default HomePage;
