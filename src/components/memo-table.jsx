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
  const initialData = {
    id: uuidv4(),
    content: "",
  };
  const [memoList, setMemoList] = useState([]);
  const [memoId, setMemoId] = useState(null);
  // const [memoId, setMemoId] = useState(initialData.id);
  const [isEditable, setIsEditable] = useState(false);
  const selectedMemo = memoList.find((memo) => memo.id === memoId);
  // memoList.find((memo) => memo.id === memoId) || initialData;

  useEffect(() => {
    const memosCollectionRef = collection(db, "memos");
    const q = query(memosCollectionRef, orderBy("createdAt"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      // docChange関数で追加、更新、削除で処理を分岐させる
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
    // setMemoList([...memoList, newMemo]);
    //     編集ステータスをオンにする
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
    // setMemoList(
    //   memoList.map((memo) => {
    //     if (memo.id === id) {
    //       return { ...memo, content: text };
    //     } else {
    //       return memo;
    //     }
    //   }),
    // );
  };

  const handleDeleteMemo = async (id) => {
    setIsEditable(false);
    try {
      await deleteDoc(doc(db, "memos", id));
    } catch (e) {
      console.error(e);
    }
    // setMemoList(memoList.filter((memo) => memo.id !== id));
    // IDの値を初期化しないとバグる
    // setMemoId(initialData.id);
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
