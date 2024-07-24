import MemoList from "./MemoList";
import MemoDetail from "./MemoDetail";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
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

export default function MemoContainer() {
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
      await updateDoc(doc(db, "memos", id), {
        content: text,
      });
    } catch (e) {
      console.error(e);
    }
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
      />
      {isEditable && (
        <MemoDetail
          key={memoId}
          selectedMemo={selectedMemo}
          onEdit={handleEditMemo}
          onDelete={handleDeleteMemo}
        />
      )}
    </>
  );
}
