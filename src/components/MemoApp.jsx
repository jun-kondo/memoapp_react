import MemoList from "./MemoList";
import MemoForm from "./MemoForm";
import useMemos from "../hooks/useMemos";
import MemoAppHeader from "./MemoAppHeader";
import AddMemoButton from "./AddMemoButton";

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
      <MemoAppHeader selectedMemo={selectedMemo} />
      <AddMemoButton onAdd={handleAddMemo} />
      <main>
        <MemoList
          memos={memoList}
          onSelect={(memoId) => {
            setSelectedMemo(memoList.find((memo) => memo.id === memoId));
          }}
        />
        {selectedMemo && (
          <MemoForm
            key={selectedMemo.id}
            selectedMemo={selectedMemo}
            onEdit={handleEditMemo}
            onDelete={handleDeleteMemo}
          />
        )}
      </main>
    </>
  );
}
