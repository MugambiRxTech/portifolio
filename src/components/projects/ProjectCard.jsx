import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../common/ConfirmModal";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80";

export default function ProjectCard({ project, onDelete }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <article className="pCard">
        <div className="pImgWrap">
          <img
            className="pImg"
            src={project.imageUrl?.trim() ? project.imageUrl : FALLBACK_IMG}
            alt={project.title}
            loading="lazy"
          />
          <span className="pBadge">{project.category}</span>
        </div>

        <div className="pBody">
          <div className="pTop">
            <Link className="pTitle" to={`/projects/${project.id}`}>
              {project.title}
            </Link>

            <button className="iconBtn" onClick={() => setConfirmOpen(true)} title="Delete" aria-label="Delete project">
              ✕
            </button>
          </div>

          <div className="pMeta">
            <span className="pYear">📅 {project.year}</span>
          </div>

          <p className="pDesc">{project.description}</p>

          {!!project.tags?.length && (
            <div className="pTags">
              {project.tags.slice(0, 4).map((t) => (
                <span key={t} className="tagChip">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      <ConfirmModal
        open={confirmOpen}
        title="Delete project?"
        message={`This will permanently remove "${project.title}".`}
        confirmText="Yes, delete"
        cancelText="Cancel"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          onDelete(project.id);
          setConfirmOpen(false);
        }}
      />
    </>
  );
}
