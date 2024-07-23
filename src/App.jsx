import MemoApp from "./components/MemoApp";
import { LoginProvider } from "./hooks/LoginHook";
import LoginButton from "./LoginButton";

export default function App() {
  return (
    <>
      <LoginProvider>
        <LoginButton />
        <MemoApp />
      </LoginProvider>
    </>
  );
}
