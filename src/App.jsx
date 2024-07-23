import { useState } from "react";
import MemoApp from "./components/MemoApp";
import LoginContext from "./components/LoginContext";
import LoginButton from "./LoginButton";

export default function App() {
  // プロバイダーに移動
  // const [isLogin, setIsLogin] = useState(false);
  // const loginConfig = {
  //   isLogin,
  //   toggleLogin: () => {
  //     setIsLogin(!isLogin);
  //   },
  // };

  return (
    <>
      <LoginProvider>
        <LoginButton />
        <MemoApp />
      </LoginProvider>
    </>
  );
}

const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const loginConfig = {
    isLogin,
    toggleLogin: () => {
      setIsLogin(!isLogin);
    },
  };

  return (
    <LoginContext.Provider value={loginConfig}>
      {children}
    </LoginContext.Provider>
  );
};
