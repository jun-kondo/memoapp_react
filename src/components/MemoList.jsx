import { useLoginConfig } from "../hooks/LoginHook";

export default function MemoList({ memos, onSelect, onAdd }) {
  const { isLogin } = useLoginConfig();
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
        {isLogin && (
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
        )}
      </ul>
    </section>
  );
}
