import { useState } from "react";
import { createContext } from "react";

export const LoginContext = createContext({});

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const loginConfig = {
    isLogin,
    toggleLogin: () => {
      setIsLogin((prev) => !prev);
    },
  };

  return (
    <LoginContext.Provider value={loginConfig}>
      {children}
    </LoginContext.Provider>
  );
};
