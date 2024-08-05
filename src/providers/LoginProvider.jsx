import { useState } from "react";
import { createContext } from "react";

export const LoginContext = createContext({});

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginState = {
    isLoggedIn: isLoggedIn,
    toggleLogin: () => {
      setIsLoggedIn((prev) => !prev);
    },
  };

  return (
    <LoginContext.Provider value={loginState}>{children}</LoginContext.Provider>
  );
};
