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
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [newMemoId, setNewMemoId] = useState(null);

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

  useEffect(() => {
    if (newMemoId) {
      const newMemo = memoList.find((memo) => memo.id === newMemoId);
      if (newMemo) {
        setSelectedMemo(newMemo);
        setNewMemoId(null);
      }
    }
  }, [memoList, newMemoId]);

  const handleAddMemo = async () => {
    const newMemoId = await generateNewMemo();
    setNewMemoId(newMemoId);
  };

  const generateNewMemo = async () => {
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
    return newMemoId;
  };

  const handleEditMemo = async ({ id, ...rest }) => {
    setSelectedMemo(null);
    try {
      await updateDoc(doc(db, "memos", id), rest);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteMemo = async (id) => {
    setSelectedMemo(null);
    try {
      await deleteDoc(doc(db, "memos", id));
    } catch (e) {
      console.error(e);
    }
  };

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
        <MemoDetail
          key={selectedMemo.id}
          selectedMemo={selectedMemo}
          onEdit={handleEditMemo}
          onDelete={handleDeleteMemo}
        />
      )}
    </>
  );
}
