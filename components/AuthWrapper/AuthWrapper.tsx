import checkForUsername from "../../utils/CheckForUsername";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import styles from "./AuthWrapper.module.css";
import Link from "next/link";

interface authProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<authProps> = ({ children }) => {
  const [userNameExists, setUserNameExists] = useState<boolean>(false);
  const [userIsAuthenticated, setUserIsAuthenticated] =
    useState<boolean>(false);
  const user = useContext(UserContext);
  const [isUserNameSet, setIsUserNameSet] = useState<boolean>(false);

  useEffect(() => {
    const checkUsername = async () => {
      const result = await checkForUsername(user?.username);
      setUserNameExists(result);
    };
    checkUsername();
  }, [user?.username]);

  const isUsername: string | null = localStorage.getItem("username");

  useEffect(() => {
    if (isUsername) {
      setIsUserNameSet(true);
    }
  }, [isUsername]);

  useEffect(() => {
    setUserIsAuthenticated(userNameExists && isUserNameSet);
  }, [userNameExists, isUserNameSet]);

  if (!userIsAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.text}>Not Authenticated</h1>
          <Link href="/">
            <a className={styles.link}>Login here</a>
          </Link>
        </div>
      </div>
    );
  }

  return <>{userIsAuthenticated && children}</>;
};

export default AuthWrapper;
