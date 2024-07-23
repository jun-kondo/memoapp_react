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

// valueの値(この場合はloginConfig)が渡される
// useLoginStatusはログインに関するstate変数や更新関数を持ったcustom hook
export const useLoginStatus = () => useContext(LoginContext);
