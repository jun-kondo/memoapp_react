import { useState } from "react";

export default function MemoEditTable({ selectedMemo, onEdit, onDelete }) {
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
