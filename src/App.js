import { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  return (
    <>
      <MemoTable memos={MEMOS} />
    </>
  );
}

function MemoTable({ memos }) {
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

function MemoList({ memos, onSelect, onEditable, onAdd }) {
  return (
    <section className="memo-list">
      <ul>
        {memos.map((memo) => (
          <li key={memo.id}>
            <a
              href="#"
              onClick={() => {
                onSelect(memo.id);
                onEditable(true);
              }}
            >
              {memo.content.split("\n")[0]}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            onClick={() => {
              onAdd();
            }}
          >
            +
          </a>
        </li>
      </ul>
    </section>
  );
}

function MemoEditTable({ selectedMemo, onEdit, onDelete }) {
  const [text, setText] = useState(selectedMemo.content);
  return (
    <section className="edit-table">
      <form>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <br />
        <button
          onClick={() => {
            onEdit(selectedMemo.id, text);
          }}
        >
          編集
        </button>
        <button
          onClick={() => {
            onDelete(selectedMemo.id);
          }}
        >
          削除
        </button>
      </form>
    </section>
  );
}

const MEMOS = [
  {
    id: "1",
    title: "メモ1",
    content: "メモ1のタイトル\nメモ1の内容\nメモ1の内容\nメモ1の内容\n",
  },
  {
    id: "2",
    title: "メモ2",
    content: "メモ2のタイトル\nメモ2の内容\nメモ2の内容\nメモ2の内容\n",
  },
  {
    id: "3",
    title: "メモ3",
    content: "メモ3のタイトル\nメモ3の内容\nメモ3の内容\nメモ3の内容\n",
  },
  {
    id: "4",
    title: "メモ4",
    content: "メモ4のタイトル\nメモ4の内容\nメモ4の内容\nメモ4の内容\n",
  },
  {
    id: "5",
    title: "メモ5",
    content: "メモ5のタイトル\nメモ5の内容\nメモ5の内容\nメモ5の内容\n",
  },
];
