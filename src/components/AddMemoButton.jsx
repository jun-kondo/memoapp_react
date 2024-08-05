import useLoginConfig from "../hooks/useLoginConfig";

export default function AddMemoButton({ onAdd }) {
  const { isLoggedIn } = useLoginConfig();
  return (
    <>
      {isLoggedIn && (
        <div
          className="add-memo-button"
          onClick={() => {
            onAdd();
          }}
        >
          ＋
        </div>
      )}
    </>
  );
}
