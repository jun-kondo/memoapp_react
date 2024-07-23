import { useState } from "react";
import { createContext, useContext } from "react";

const LoginContext = createContext({});

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

export const useLoginStatus = () => useContext(LoginContext);
