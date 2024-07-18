import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import MemoList from "./memo-list";
import MemoEditTable from "./memo-edit-table";
import { db } from "../firebase";
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function MemoTable() {
  const [memoList, setMemoList] = useState([]);
  const [memoId, setMemoId] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const selectedMemo = memoList.find((memo) => memo.id === memoId);

  useEffect(() => {
    const memosCollectionRef = collection(db, "memos");
    const q = query(memosCollectionRef, orderBy("createdAt"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setMemoList(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      );
    });
    return () => {
      unsub();
    };
  }, []);

  const handleAddMemo = async () => {
    const newMemoId = uuidv4();
    try {
      await setDoc(
        doc(db, "memos", newMemoId),
        {
          content: "新規メモ",
          createdAt: new Date().getTime(),
        },
        { merge: true },
      );
    } catch (e) {
      console.error(e);
    }
    setMemoId(newMemoId);
    setIsEditable(true);
  };

  const handleEditMemo = async (id, text) => {
    setIsEditable(false);
    try {
      if (isWhitespace(text)) {
        throw new Error("the content is empty!!");
      } else {
        await updateDoc(doc(db, "memos", id), {
          content: text,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const isWhitespace = (text) => {
    const regex = /^\s*$/;
    return regex.test(text);
  };

  const handleDeleteMemo = async (id) => {
    setIsEditable(false);
    try {
      await deleteDoc(doc(db, "memos", id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1>{isEditable ? "編集" : "一覧"}</h1>
      <MemoList
        memos={memoList}
        onSelect={setMemoId}
        isEditable={setIsEditable}
        onAdd={handleAddMemo}
        isWhitespace={isWhitespace}
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
