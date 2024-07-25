import MemoList from "./MemoList";
import MemoForm from "./MemoForm";
import useMemos from "../hooks/useMemos";

export default function MemoApp() {
  const {
    selectedMemo,
    setSelectedMemo,
    memoList,
    handleAddMemo,
    handleEditMemo,
    handleDeleteMemo,
  } = useMemos();
  return (
    <>
      <h1>{selectedMemo ? "編集" : "一覧"}</h1>
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
