import { useEffect } from "react";

export default function Toast({ open, message, onClose, duration = 2200 }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [open, onClose, duration]);

  if (!open) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toastDot" />
      <span className="toastMsg">{message}</span>
      <button className="toastClose" onClick={onClose} aria-label="Close toast">
        ✕
      </button>
    </div>
  );
}
