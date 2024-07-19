import { useForm } from "react-hook-form";

export default function MemoEditTable({ selectedMemo, onEdit, onDelete }) {
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
  const onsubmit = (data) => onEdit(selectedMemo.id, data.content);
  const onerror = (err) => console.error(err);
  return (
    <section className="edit-table">
      <form onSubmit={handleSubmit(onsubmit, onerror)}>
        <textarea
          // id="content"
          // type="text"
          {...register("content", {
            required: "必須入力です",
            validate: {
              emptyString: (value) => {
                if (!value.match(/\S/g)) {
                  // 空白文字以外をサーチ、一致するものがなければnull(空白文字のみ), それを反転してTrue
                  return "please enter text";
                }
              },
            },
          })}
        />
        <br />
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
      </form>
      {errors.content?.message && (
        <p className="error-message" style={{ color: "red" }}>
          {errors.content.message}
        </p>
      )}
    </section>
  );
}
