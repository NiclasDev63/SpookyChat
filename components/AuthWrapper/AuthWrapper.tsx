import checkForUsername from "../../utils/CheckForUsername";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import styles from "./AuthWrapper.module.css";
import Link from "next/link";

interface AuthProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthProps> = ({ children }) => {
  const [userNameExists, setUserNameExists] = useState<boolean>(false);
  const [userIsAuthenticated, setUserIsAuthenticated] =
    useState<boolean>(false);
  const user = useContext(UserContext);
  const [isUserNameSet, setIsUserNameSet] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingConter, setLoadingCounter] = useState<number>(0);

  useEffect(() => {
    const checkUsername = async () => {
      const result = await checkForUsername(user?.username);
      setUserNameExists(result);
    };
    checkUsername();
  }, [user?.username]);

  const isUsername: string | undefined = user?.username;

  useEffect(() => {
    if (isUsername) {
      setIsUserNameSet(true);
    }
  }, [isUsername]);

  useEffect(() => {
    setUserIsAuthenticated(userNameExists && isUserNameSet);
  }, [userNameExists, isUserNameSet]);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingCounter((prev) => prev + 1);
      }, 1000);
      if (loadingConter === 10) {
        setIsLoading(false);
        return () => clearInterval(interval);
      }
    }
  }, [isLoading, loadingConter]);

  if (!userIsAuthenticated) {
    if (loadingConter > 10) {
      return (
        <div className={styles.container}>
            <div className={styles.loading}></div>
          <div className={styles.content}>
            <h1 className={styles.text}>
              If Loading takes too long, please make sure that you are logged in
              correctly
            </h1>
            <Link href="/">
              <a className={styles.link}>Login here</a>
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.container}>
        <div className={styles.loading}></div>
      </div>
    );
  }

  return <>{userIsAuthenticated && children}</>;
};

export default AuthWrapper;
