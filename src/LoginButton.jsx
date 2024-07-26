import { useLoginConfig } from "./hooks/LoginHook";

export default function LoginButton() {
  const { isLogin, toggleLogin } = useLoginConfig();
  return (
    <button onClick={toggleLogin}>{isLogin ? "ログアウト" : "ログイン"}</button>
  );
}
