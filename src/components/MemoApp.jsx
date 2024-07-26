import MemoList from "./MemoList";
import MemoForm from "./MemoForm";
import useMemos from "../hooks/useMemos";
import useLoginConfig from "../hooks/useLoginConfig";

export default function MemoApp() {
  const {
    selectedMemo,
    setSelectedMemo,
    memoList,
    handleAddMemo,
    handleEditMemo,
    handleDeleteMemo,
  } = useMemos();
  const { isLogin } = useLoginConfig();
  return (
    <>
      <h1>{isLogin ? "ログイン中" : "未ログイン"}</h1>
      <h2>{isLogin && (selectedMemo ? "編集" : "一覧")}</h2>
      <MemoList
        memos={memoList}
        onSelect={(memoId) => {
          setSelectedMemo(memoList.find((memo) => memo.id === memoId));
        }}
        onAdd={handleAddMemo}
      />
      {selectedMemo && (
        <MemoForm
          key={selectedMemo.id}
          selectedMemo={selectedMemo}
          onEdit={handleEditMemo}
          onDelete={handleDeleteMemo}
        />
      )}
    </>
  );
}
