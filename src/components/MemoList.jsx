import useLoginConfig from "../hooks/useLoginConfig";

export default function MemoList({ memos, onSelect, onAdd }) {
  const { isLoggedIn } = useLoginConfig();
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
            <a
              href="#"
              onClick={() => {
                onSelect(id);
              }}
            >
              {title(content)}
            </a>
          </li>
        ))}
        {isLoggedIn && (
          <button
            onClick={() => {
              onAdd();
            }}
          >
            +
          </button>
        )}
      </ul>
    </section>
  );
}
