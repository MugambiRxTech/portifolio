import { useMemo, useState } from "react";
import ConfirmModal from "../common/ConfirmModal"; // reuse modal UI shell if you want
// We'll use a dedicated modal markup so it matches your design closely:

export default function AddProjectModal({ open, onClose, onAdd, categories }) {
  const currentYear = new Date().getFullYear();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories?.[1] || "Web Design");
  const [year, setYear] = useState(String(currentYear));
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const safeCategories = useMemo(
    () => (categories?.length ? categories.filter((c) => c !== "All") : ["Web Design", "Mobile App", "Branding", "UI/UX", "Marketing"]),
    [categories]
  );

  if (!open) return null;

  function resetAndClose() {
    setTitle("");
    setDescription("");
    setCategory(safeCategories[0] || "Web Design");
    setYear(String(currentYear));
    setImageUrl("");
    setTags("");
    setError("");
    onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();

    const t = title.trim();
    const d = description.trim();
    const y = Number(year);

    if (!t || !d) {
      setError("Title and description are required.");
      return;
    }
    if (!y || y < 1900 || y > 2100) {
      setError("Please enter a valid year.");
      return;
    }

    const tagList = tags
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    onAdd({
      id: crypto.randomUUID(),
      title: t,
      description: d,
      category,
      year: y,
      imageUrl: imageUrl.trim(),
      tags: tagList,
    });

    resetAndClose();
  }

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true" onClick={resetAndClose}>
      <div className="addModal" onClick={(e) => e.stopPropagation()}>
        <div className="addModalHead">
          <div>
            <h3 className="addModalTitle">Add New Project</h3>
            <p className="addModalSub">Fill in the details to add a new project to your portfolio.</p>
          </div>
          <button className="iconBtn" onClick={resetAndClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="addForm">
          <label className="label">Project Title *</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter project title" />

          <label className="label">Description *</label>
          <textarea
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your project"
            rows={4}
          />

          <div className="twoCol">
            <div>
              <label className="label">Category *</label>
              <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
                {safeCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Year *</label>
              <input className="input" value={year} onChange={(e) => setYear(e.target.value)} placeholder={`${currentYear}`} />
            </div>
          </div>

          <label className="label">Image URL (Optional)</label>
          <input className="input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" />
          <p className="hint">Leave empty for a default placeholder image.</p>

          <label className="label">Tags (comma-separated)</label>
          <input className="input" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="React, TypeScript, Design" />

          {error && <div className="error">{error}</div>}

          <div className="addModalActions">
            <button type="button" className="ghostBtn" onClick={resetAndClose}>
              Cancel
            </button>
            <button type="submit" className="primaryBtn">
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
