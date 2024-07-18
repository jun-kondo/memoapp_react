export default function MemoList({
  memos,
  onSelect,
  isEditable,
  onAdd,
  isWhitespace,
}) {
  const title = (memo) => {
    return memo.content.split("\n").find((sentence) => !isWhitespace(sentence));
  };
  return (
    <section className="memo-list">
      <ul>
        {memos.map((memo) => (
          <li key={memo.id}>
            <a
              href="#"
              onClick={() => {
                onSelect(memo.id);
                isEditable(true);
              }}
            >
              {title(memo)}
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
