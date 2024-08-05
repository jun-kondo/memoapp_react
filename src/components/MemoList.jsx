import AddMemoButton from "./AddMemoButton";

export default function MemoList({ memos, onSelect, onAdd }) {
  const title = (content) => {
    return content.split("\n").find((sentence) => !isWhitespace(sentence));
  };

  const isWhitespace = (text) => {
    const regex = /^\s*$/;
    return regex.test(text);
  };

  return (
    <section className="memo-list">
      <ul>
        {memos.map(({ id, content }) => (
          <li key={id}>
            <div
              className="memo-item"
              onClick={() => {
                onSelect(id);
              }}
            >
              {title(content)}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
