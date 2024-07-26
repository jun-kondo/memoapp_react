import MemoApp from "./components/MemoApp";
import { LoginProvider } from "./providers/LoginProvider";
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
