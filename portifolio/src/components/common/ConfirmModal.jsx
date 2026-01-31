import { useEffect } from "react";

export default function ConfirmModal({
  open,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  // Close on ESC key
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onCancel();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="modalOverlay"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}   // 👈 click outside closes
    >
      <div
        className="modalCard"
        onClick={(e) => e.stopPropagation()} // 👈 prevent inner click closing
      >
        <h3 className="modalTitle">{title}</h3>
        <p className="modalMessage">{message}</p>

        <div className="modalActions">
          <button
            type="button"
            className="modalBtn"
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className="modalBtn modalBtnDanger"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
