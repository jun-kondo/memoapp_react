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
  const { isLoggedIn } = useLoginConfig();
  return (
    <>
      <p>{isLoggedIn ? "ログイン中" : "未ログイン"}</p>
      <p>{isLoggedIn && (selectedMemo ? "編集" : "一覧")}</p>
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
