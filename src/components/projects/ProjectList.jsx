import ProjectCard from "./ProjectCard";

export default function ProjectList({ projects, onDelete }) {
  if (!projects.length) return <p className="empty">No projects found.</p>;

  return (
    <div className="pGrid">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} onDelete={onDelete} />
      ))}
    </div>
  );
}
