export default function MemoList({ memos, onSelect, onEditable, onAdd }) {
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
