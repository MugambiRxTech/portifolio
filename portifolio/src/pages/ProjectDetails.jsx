import { Link, useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialProjects } from "../data/projects";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80";

export default function ProjectDetails() {
  const { id } = useParams();

  const [projects] = useLocalStorage("pps_projects", initialProjects);
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="csPage">
        <header className="csNav">
          <div className="csBrand">
            <div className="csLogo">▣</div>
            <div>
              <div className="csBrandName">Creative Studio</div>
              <div className="csBrandSub">Portfolio Showcase</div>
            </div>
          </div>

          <Link className="csAddBtn" to="/">
            ← Back
          </Link>
        </header>

        <main className="csMain">
          <p className="empty">Project not found.</p>
        </main>

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
              <span>Built with React SPA</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  const img = project.imageUrl?.trim() ? project.imageUrl : FALLBACK_IMG;

  return (
    <div className="csPage">
      <header className="csNav">
        <div className="csBrand">
          <div className="csLogo">▣</div>
          <div>
            <div className="csBrandName">Creative Studio</div>
            <div className="csBrandSub">Portfolio Showcase</div>
          </div>
        </div>

        <Link className="csAddBtn" to="/">
          ← Back to Projects
        </Link>
      </header>

      <main className="csMain">
        <section className="detailShell">
          <div className="detailImageWrap">
            <img className="detailImage" src={img} alt={project.title} />
            <span className="detailBadge">{project.category}</span>
          </div>

          <div className="detailBody">
            <div className="detailHeader">
              <h1 className="detailTitle">{project.title}</h1>
              <div className="detailYear">📅 {project.year}</div>
            </div>

            <p className="detailDesc">{project.description}</p>

            {!!project.tags?.length && (
              <div className="detailTags">
                {project.tags.map((t) => (
                  <span key={t} className="tagChip">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="detailActions">
              <Link to="/" className="primaryBtn" style={{ textDecoration: "none" }}>
                Back to Portfolio
              </Link>

              <a
                className="ghostBtn"
                href={img}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                View Image
              </a>
            </div>
          </div>
        </section>
      </main>

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
            <span>Built with React SPA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
