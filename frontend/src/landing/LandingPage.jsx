import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const ISSUES = [
  { title: "Fix login redirect bug", priority: "high", tag: "Bug", user: "AJ", color: "#6c63ff" },
  { title: "Add dark mode toggle", priority: "med", tag: "Feature", user: "SK", color: "#00d4aa" },
  { title: "Improve issue search", priority: "low", tag: "Enhancement", user: "MR", color: "#f59e0b" },
  { title: "Member invite email template", priority: "med", tag: "Design", user: "PP", color: "#ef4444" },
  { title: "Bulk close resolved issues", priority: "low", tag: "Feature", user: "TK", color: "#6c63ff" },
  { title: "Priority filter on board", priority: "high", tag: "Bug", user: "AJ", color: "#00d4aa" },
  { title: "Export project report PDF", priority: "med", tag: "Feature", user: "MR", color: "#f59e0b" },
  { title: "Tag autocomplete UI", priority: "low", tag: "UI", user: "SK", color: "#ef4444" },
];

const FEATURES = [
  { label: "Issue tracking", dot: "purple" },
  { label: "Team collaboration", dot: "green" },
  { label: "Priority management", dot: "amber" },
  { label: "Tag & label system", dot: "purple" },
  { label: "Member roles", dot: "green" },
  { label: "Progress tracking", dot: "amber" },
  { label: "Assignee management", dot: "purple" },
  { label: "Real-time updates", dot: "green" },
];

const MINI_CARDS = [
  {
    color: "#6c63ff",
    bg: "rgba(108,99,255,0.15)",
    label: "Projects",
    sub: "Create & organize projects",
    icon: (
      <svg width="18" height="18" fill="none" stroke="#6c63ff" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    color: "#00d4aa",
    bg: "rgba(0,212,170,0.15)",
    label: "Members",
    sub: "Invite & assign team",
    icon: (
      <svg width="18" height="18" fill="none" stroke="#00d4aa" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    color: "#f5a623",
    bg: "rgba(245,166,35,0.15)",
    label: "Issues",
    sub: "Track & resolve issues",
    icon: (
      <svg width="18" height="18" fill="none" stroke="#f5a623" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    label: "Tags & Priority",
    sub: "Categorize effortlessly",
    icon: (
      <svg width="18" height="18" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 6l9-3 9 3M3 6v12l9 3m-9-15l9 3m9-3v12l-9 3m9-12l-9 3" />
      </svg>
    ),
  },
];

function IssuePill({ issue }) {
  const priorityClass =
    issue.priority === "high" ? "p-high" : issue.priority === "med" ? "p-med" : "p-low";
  return (
    <div className="issue-pill">
      <span className={`priority-dot ${priorityClass}`} />
      {issue.title}
      <span
        className="issue-tag"
        style={{ background: `${issue.color}22`, color: issue.color }}
      >
        {issue.tag}
      </span>
      <span
        className="avatar"
        style={{ background: `${issue.color}22`, color: issue.color }}
      >
        {issue.user}
      </span>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const tickerRef = useRef(null);

  const tickerItems = [...ISSUES, ...ISSUES, ...ISSUES, ...ISSUES];

  return (
    <div className="lp-root">
      {/* Background */}
      <div className="bg-grid" />
      <div className="bg-blob blob1" />
      <div className="bg-blob blob2" />

      {/* Navbar */}
      <nav className="lp-nav">
        <div className="lp-logo">
          projecto<span>.</span>
        </div>
        <div className="nav-btns">
          <button className="btn-ghost" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn-solid" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="badge">
          <span className="badge-dot" />
          Project management, reimagined
        </div>

        <h1>
          Ship faster with
          <br />
          <span className="hl">Projecto</span>
        </h1>

        <p className="sub">
          Track issues, assign members, set priorities, and manage your entire
          project lifecycle — all in one place.
        </p>

        <div className="hero-actions">
          <button className="btn-cta" onClick={() => navigate("/login")}>
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Get started
          </button>
          
        </div>

        {/* Mini Feature Cards */}
        <div className="cards-row">
          {MINI_CARDS.map((card) => (
            <div className="mini-card" key={card.label}>
              <div
                className="card-icon"
                style={{ background: card.bg }}
              >
                {card.icon}
              </div>
              <div>
                <div className="card-label">{card.label}</div>
                <div className="card-sub">{card.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature chips */}
      <div className="features-strip">
        {FEATURES.map((f, i) => (
          <div
            className="feat-chip"
            key={f.label}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <span className={`chip-dot dot-${f.dot}`} />
            {f.label}
          </div>
        ))}
      </div>

      {/* Scrolling ticker */}
      <div className="ticker-wrap">
        <div className="ticker" ref={tickerRef}>
          {tickerItems.map((issue, i) => (
            <IssuePill key={i} issue={issue} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="lp-footer">
        &copy; 2025 Projecto &mdash; Built for teams that ship.
      </footer>
    </div>
  );
}
