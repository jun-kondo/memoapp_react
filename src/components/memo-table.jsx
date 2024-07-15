import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MemoList from "./memo-list";
import MemoEditTable from "./memo-edit-table";

export default function MemoTable({ memos }) {
  const initialData = {
    id: uuidv4(),
    content: "",
  };
  const [memoList, setMemoList] = useState(memos);
  const [memoId, setMemoId] = useState(null);
  // const [memoId, setMemoId] = useState(initialData.id);
  const [isEditable, setIsEditable] = useState(false);
  const selectedMemo = memoList.find((memo) => memo.id === memoId);
  // memoList.find((memo) => memo.id === memoId) || initialData;

  const handleAddMemo = () => {
    const newMemo = {
      id: uuidv4(),
      content: "新規メモ",
    };
    setMemoList([...memoList, newMemo]);
    //     編集ステータスをオンにする
    setMemoId(newMemo.id);
    setIsEditable(true);
  };

  const handleEditMemo = (id, text) => {
    setMemoList(
      memoList.map((memo) => {
        if (memo.id === id) {
          return { ...memo, content: text };
        } else {
          return memo;
        }
      }),
    );
    setIsEditable(false);
  };

  const handleDeleteMemo = (id) => {
    setMemoList(memoList.filter((memo) => memo.id !== id));
    // IDの値を初期化しないとバグる
    // setMemoId(initialData.id);
    setIsEditable(false);
  };

  return (
    <>
      <h1>{isEditable ? "編集" : "一覧"}</h1>
      <MemoList
        memos={memoList}
        onSelect={(id) => setMemoId(id)}
        onEditable={(boolean) => setIsEditable(boolean)}
        onAdd={handleAddMemo}
      />
      {isEditable && (
        <MemoEditTable
          key={memoId}
          selectedMemo={selectedMemo}
          onEdit={handleEditMemo}
          onDelete={handleDeleteMemo}
        />
      )}
    </>
  );
}
