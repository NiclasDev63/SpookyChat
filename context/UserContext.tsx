import React, { createContext, useState } from "react";

interface UserContextType {
  username: string;
  onLogin: (username: string) => void;
  onLogout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = (props: any) => {
  const [username, setUsername] = useState("");

  const logoutHandler = async () => {
    await fetch("/api/deleteMember", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    });
    setUsername("");
    localStorage.removeItem("username");
  };

  const loginHandler = async (username: string) => {
    await fetch("/api/createNewMember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
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
