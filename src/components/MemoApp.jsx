import MemoList from "./MemoList";
import MemoForm from "./MemoForm";
import useMemos from "../hooks/useMemos";
import MemoAppHeader from "./MemoAppHeader";

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
      <main>
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
      </main>
    </>
  );
}
