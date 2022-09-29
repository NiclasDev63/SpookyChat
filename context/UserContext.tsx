import React, { createContext, useState } from "react";

interface UserContextType {
  username: string;
  onLogin: (username: string) => void;
  onLogout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = (props: any) => {
  const [username, setUsername] = useState("");

  const logoutHandler = () => {
    localStorage.removeItem("username");
    setUsername("");
  };

  const loginHandler = (username: string) => {
    fetch("http://localhost:3000/api/createNewMember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    }).then((res) => res.json());
    setUsername(username);
    localStorage.setItem("username", username);
  };

  return (
    <UserContext.Provider
      value={{ username, onLogin: loginHandler, onLogout: logoutHandler }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
