import { useState } from "react";
import MemoApp from "./components/MemoApp";
import LoginContent from "./components/LoginContent";
import LoginButton from "./LoginButton";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const loginConfig = {
    isLogin,
    toggleLogin: () => {
      setIsLogin(!isLogin);
    },
  };

  return (
    <>
      <LoginContent.Provider value={loginConfig}>
        <LoginButton />
        <MemoApp />
      </LoginContent.Provider>
    </>
  );
}
