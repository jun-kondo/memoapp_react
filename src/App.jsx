import MemoApp from "./components/MemoApp";
import { LoginProvider } from "./providers/LoginProvider";
import "./App.css";

export default function App() {
  return (
    <>
      <LoginProvider>
        <MemoApp />
      </LoginProvider>
    </>
  );
}
