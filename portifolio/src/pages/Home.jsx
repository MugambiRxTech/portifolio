import { useMemo, useState } from "react";
import { initialProjects } from "../data/projects";
import { CATEGORIES } from "../data/categories";
import { useLocalStorage } from "../hooks/useLocalStorage";

import ProjectList from "../components/projects/ProjectList";
import Toast from "../components/common/Toast";
import AddProjectModal from "../components/projects/AddProjectModal";

export default function Home() {
  const [projects, setProjects] = useLocalStorage("pps_projects", initialProjects);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [addOpen, setAddOpen] = useState(false);

  const [toast, setToast] = useState({ open: false, message: "" });

  function showToast(message) {
    setToast({ open: true, message });
  }

  function handleAddProject(newProject) {
    setProjects((prev) => [newProject, ...prev]);
    showToast("Project added");
  }

  function handleDeleteProject(id) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast("Project deleted");
  }

  const categoriesCount = useMemo(() => {
    const set = new Set(projects.map((p) => p.category).filter(Boolean));
    return set.size;
  }, [projects]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return projects.filter((p) => {
      const inCategory = activeCategory === "All" || p.category === activeCategory;

      const inSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q));

      return inCategory && inSearch;
    });
  }, [projects, search, activeCategory]);

  return (
    <div className="csPage">
      {/* NAVBAR */}
      <header className="csNav">
        <div className="csBrand">
          <div className="csLogo">▣</div>
          <div>
            <div className="csBrandName">Creative Studio</div>
            <div className="csBrandSub">Portfolio Showcase</div>
          </div>
        </div>

        <button className="csAddBtn" onClick={() => setAddOpen(true)}>
          + Add New Project
        </button>
      </header>

      {/* HERO */}
      <section className="csHero">
        <div className="csPill">Showcasing Excellence</div>

        <h1 className="csTitle">Our Portfolio</h1>
        <p className="csSubtitle">
          Explore our collection of creative projects. From web design to mobile apps, each
          project represents our commitment to exceptional digital experiences.
        </p>
      </section>

      {/* SEARCH + FILTERS */}
      <section className="csControls">
        <div className="csSearch">
          <span className="csSearchIcon">🔍</span>
          <input
            type="search"
            className="csSearchInput"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title, description, or tags..."
            inputMode="search"
            autoComplete="off"
          />
        </div>

        <div className="csChips">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`chip ${activeCategory === c ? "chipActive" : ""}`}
              onClick={() => setActiveCategory(c)}
              type="button"
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <main className="csMain">
        <ProjectList projects={filtered} onDelete={handleDeleteProject} />
      </main>

      {/* STATS */}
      <section className="csStats csStatsBottom">
        <div className="stat">
          <div className="statNum">{projects.length}</div>
          <div className="statLabel">Total Projects</div>
        </div>

        <div className="stat">
          <div className="statNum">{categoriesCount}</div>
          <div className="statLabel">Categories</div>
        </div>

        <div className="stat">
          <div className="statNum">{filtered.length}</div>
          <div className="statLabel">Showing Projects</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="csFooter">
        <div className="footerInner">
          <div className="footerBrand">
            <span className="footerLogo">▣</span>
            <div>
              <strong>Creative Studio</strong>
              <div className="footerSub">Portfolio Showcase</div>
            </div>
          </div>

          <div className="footerMeta">
            <span>© {new Date().getFullYear()} Creative Studio</span>
            <span>Built with React</span>
          </div>
        </div>
      </footer>

      {/* ADD MODAL */}
      <AddProjectModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAddProject}
        categories={CATEGORIES}
      />

      {/* TOAST */}
      <Toast
        open={toast.open}
        message={toast.message}
        onClose={() => setToast({ open: false, message: "" })}
      />
    </div>
  );
}
