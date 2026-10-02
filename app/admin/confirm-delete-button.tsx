"use client";

export default function ConfirmDeleteButton({
  confirmText,
  label = "Delete",
}: {
  confirmText: string;
  label?: string;
}) {
  return (
    <button
      type="submit"
      className="admin-btn admin-btn-danger"
      onClick={(event) => {
        if (!window.confirm(confirmText)) {
          event.preventDefault();
        }
      }}
    >
      {label}
    </button>
  );
}
