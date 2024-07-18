export default function MemoList({ memos, onSelect, isEditable, onAdd }) {
  const title = (memo) => {
    return memo.content.split("\n").find((sentence) => !isWhitespace(sentence));
  };

  const isWhitespace = (text) => {
    const regex = /^\s*$/;
    return regex.test(text);
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
