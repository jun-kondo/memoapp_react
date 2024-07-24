import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const useMemos = () => {
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

  return {
    selectedMemo,
    setSelectedMemo,
    memoList,
    handleAddMemo,
    handleEditMemo,
    handleDeleteMemo,
  };
};

export default useMemos;
