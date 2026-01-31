import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";

function NotFound() {
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

        <a className="csAddBtn" href="/">
          ← Back Home
        </a>
      </header>

      <main className="csMain">
        <section className="detailShell" style={{ gridTemplateColumns: "1fr" }}>
          <div className="detailBody">
            <h1 className="detailTitle">Page not found</h1>
            <p className="detailDesc" style={{ marginTop: 10 }}>
              The page you’re looking for doesn’t exist or was moved.
            </p>

            <div className="detailActions" style={{ marginTop: 16 }}>
              <a className="primaryBtn" href="/" style={{ textDecoration: "none" }}>
                Go to Home
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
