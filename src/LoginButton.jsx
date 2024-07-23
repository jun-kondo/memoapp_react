import { useContext } from "react";
import LoginContent from "./components/LoginContext";

export default function LoginButton() {
  const { isLogin, toggleLogin } = useContext(LoginContent);
  return (
    <button onClick={toggleLogin}>{isLogin ? "ログアウト" : "ログイン"}</button>
  );
}
