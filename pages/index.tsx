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
    const timout = setTimeout(() => {
    const checkUsername = async () => {
      const exists = await checkForUsername(name);
      setUsernameExists(exists);
    };
    checkUsername();}, 500);
    return () => clearTimeout(timout);
  }, [name]);

  const onClickHandler = () => {
    username?.onLogin(name);
    // if (usernameExists) {
    //   return;
    // }
    router.push("/Chats");
    setName("");
  };

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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
          onChange={handler}
          value={name}
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
