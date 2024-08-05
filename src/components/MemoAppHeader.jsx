import useLoginConfig from "../hooks/useLoginConfig";
import LoginButton from "./LoginButton";

export default function MemoAppHeader({ selectedMemo }) {
  const { isLoggedIn } = useLoginConfig();
  return (
    <header>
      <div className="header-container">
        <div className="app-title">React Memo APP</div>
        <div className="header-item">
          {isLoggedIn && selectedMemo ? "編集中" : "一覧"}
        </div>
      </div>
      <div className="header-container">
        <div className="header-item">
          {isLoggedIn ? "ログイン中" : "ログインしてください"}
        </div>
        <div className="header-item">
          <LoginButton />
        </div>
      </div>
    </header>
  );
}
