import { useLoginStatus } from "./hooks/LoginHook";

export default function LoginButton() {
  const { isLogin, toggleLogin } = useLoginStatus();
  return (
    <button onClick={toggleLogin}>{isLogin ? "ログアウト" : "ログイン"}</button>
  );
}
