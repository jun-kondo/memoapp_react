import useLoginConfig from "./hooks/useLoginConfig";

export default function LoginButton() {
  const { isLoggedIn, toggleLogin } = useLoginConfig();
  return (
    <button onClick={toggleLogin}>{isLoggedIn ? "ログアウト" : "ログイン"}</button>
  );
}
