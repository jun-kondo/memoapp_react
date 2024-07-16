import MemoTable from "./components/memo-table";

export default function App() {
  return (
    <>
      {/*<MemoTable memos={MEMOS} />*/}
      <MemoTable />
    </>
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
