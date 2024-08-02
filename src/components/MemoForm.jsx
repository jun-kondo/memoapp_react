import { useForm } from "react-hook-form";
import useLoginConfig from "../hooks/useLoginConfig";

export default function MemoForm({ selectedMemo, onEdit, onDelete }) {
  const { isLoggedIn } = useLoginConfig();
  const defaultValues = {
    content: selectedMemo.content,
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const onsubmit = (data) => onEdit({ ...selectedMemo, content: data.content });
  const onerror = (err) => console.error(err);

  return (
    <section className="edit-table">
      <form onSubmit={handleSubmit(onsubmit, onerror)}>
        <textarea
          cols={30}
          rows={10}
          disabled={!isLoggedIn}
          {...register("content", {
            required: "必須入力です",
            validate: {
              emptyString: (value) => {
                if (!value.match(/\S/g)) {
                  return "空文字列のみの入力は不可です";
                }
              },
            },
          })}
        />
        <br />
        {isLoggedIn && (
          <div className="button">
            <button type="submit" disabled={!isDirty || !isValid}>
              編集
            </button>
            <button
              onClick={() => {
                onDelete(selectedMemo.id);
              }}
            >
              削除
            </button>
          </div>
        )}
      </form>
      {errors.content?.message && (
        <p className="error-message" style={{ color: "red" }}>
          {errors.content.message}
        </p>
      )}
    </section>
  );
}
