import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import Navbar from "./Navbar";
import CreateProjectModal from "./CreateProjectModal";
import { useState } from "react";

const STATS = [
  { value: "10K+", label: "Projects Created" },
  { value: "50K+", label: "Issues Resolved" },
  { value: "5K+", label: "Teams Onboard" },
  { value: "99.9%", label: "Uptime" },
];

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    color: "#7c6dfa",
    title: "Project Management",
    desc: "Create and organize projects by category. Add descriptions, tags, and track everything from a single dashboard.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    color: "#00d4aa",
    title: "Team Collaboration",
    desc: "Invite members, assign roles, and collaborate in real time. Everyone stays aligned on what matters most.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    color: "#f59e0b",
    title: "Issue Tracking",
    desc: "Create issues, set priorities (low, medium, high), assign them to members, and track progress until resolved.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    color: "#ec4899",
    title: "Tags & Categories",
    desc: "Organize projects with custom tags like React, Spring Boot, MySQL and filter instantly across your workspace.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "#7c6dfa",
    title: "Priority System",
    desc: "Never miss what's critical. Set issue priorities and let your team focus on what needs to ship first.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "#00d4aa",
    title: "Progress Tracking",
    desc: "Monitor project health at a glance. See open vs resolved issues and keep every sprint on track.",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Create a Project", desc: "Name your project, add a description and pick a category to get started." },
  { step: "02", title: "Add Members & Tags", desc: "Invite your team and tag the project with relevant technologies or topics." },
  { step: "03", title: "Create Issues", desc: "Break work into trackable issues. Set priority, assignee and due dates." },
  { step: "04", title: "Ship & Track", desc: "Monitor progress, close resolved issues, and keep your team moving forward." },
];

export default function HomePage() {
  const navigate = useNavigate();
  const[showModal,setShowModal]=useState(false);
  const[refreshKey,setRefreshKey]=useState('');
const handleProjectCreated = () => {
  setRefreshKey(prev => prev + 1);
};
  return (
    <>
    <Navbar/>
    <div className="hp-root">
      <div className="hp-bg-orb orb1" />
      <div className="hp-bg-orb orb2" />
      <div className="hp-bg-orb orb3" />

      <section className="hp-hero">
        <div className="hp-hero-inner">
          <div className="hp-eyebrow">
            <span className="hp-pulse-dot" />
            Welcome to Projecto
          </div>

          <h1 className="hp-title">
            Your team's command
            <br />
            center for <span className="hp-grad">every project</span>
          </h1>

          <p className="hp-subtitle">
            From idea to delivery — manage projects, track issues, assign members,
            and ship faster with a workspace built for modern teams.
          </p>

          <div className="hp-hero-actions">
            <button
              className="hp-btn-primary"
              onClick={() => setShowModal(true)}
            >
              <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Create Project
            </button>
            <button
              className="hp-btn-secondary"
              onClick={() => navigate("/dashboard")}
            >
              View All Projects
            </button>
          </div>

          {/* Stats row */}
          <div className="hp-stats">
            {STATS.map((s) => (
              <div className="hp-stat" key={s.label}>
                <span className="hp-stat-value">{s.value}</span>
                <span className="hp-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual — mock project card */}
        <div className="hp-hero-visual">
          <div className="hp-mock-card">
            <div className="hp-mock-header">
              <span className="hp-mock-dot red" />
              <span className="hp-mock-dot yellow" />
              <span className="hp-mock-dot green" />
              <span className="hp-mock-title-bar">projecto / my-project</span>
            </div>
            <div className="hp-mock-body">
              <div className="hp-mock-row">
                <span className="hp-mock-label">Project</span>
                <span className="hp-mock-val accent">E-commerce Platform</span>
              </div>
              <div className="hp-mock-row">
                <span className="hp-mock-label">Members</span>
                <div className="hp-avatars">
                  {["AJ","SK","MR","PP"].map((u,i) => (
                    <span key={u} className="hp-av" style={{zIndex: 10-i}}>{u}</span>
                  ))}
                </div>
              </div>
              <div className="hp-mock-row">
                <span className="hp-mock-label">Tags</span>
                <div className="hp-tags">
                  <span className="hp-tag purple">react</span>
                  <span className="hp-tag teal">spring boot</span>
                  <span className="hp-tag amber">mysql</span>
                </div>
              </div>
              <div className="hp-mock-divider" />
              <div className="hp-issue-row">
                <span className="hp-prio high" />
                <span className="hp-issue-text">Fix payment gateway bug</span>
                <span className="hp-assignee">AJ</span>
              </div>
              <div className="hp-issue-row">
                <span className="hp-prio med" />
                <span className="hp-issue-text">Add product search filter</span>
                <span className="hp-assignee">SK</span>
              </div>
              <div className="hp-issue-row">
                <span className="hp-prio low" />
                <span className="hp-issue-text">Update landing page UI</span>
                <span className="hp-assignee">MR</span>
              </div>
              <div className="hp-mock-divider" />
              <div className="hp-progress-row">
                <span className="hp-mock-label">Progress</span>
                <span className="hp-mock-val">7 / 10 issues resolved</span>
              </div>
              <div className="hp-progress-bar">
                <div className="hp-progress-fill" style={{width:"70%"}} />
              </div>
            </div>
          </div>
          {/* floating badges */}
          <div className="hp-float-badge badge-a">
            <span className="hp-badge-icon">✓</span> Issue closed
          </div>
          <div className="hp-float-badge badge-b">
            <span className="hp-badge-icon">👤</span> Member added
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="hp-section">
        <div className="hp-section-head">
          <h2 className="hp-section-title">Everything your team needs</h2>
          <p className="hp-section-sub">
            Projecto brings together all the tools to plan, build, and ship — without the clutter.
          </p>
        </div>
        <div className="hp-features-grid">
          {FEATURES.map((f) => (
            <div className="hp-feat-card" key={f.title}>
              <div className="hp-feat-icon" style={{ color: f.color, background: `${f.color}18` }}>
                {f.icon}
              </div>
              <h3 className="hp-feat-title">{f.title}</h3>
              <p className="hp-feat-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="hp-section hp-hiw-section">
        <div className="hp-section-head">
          <h2 className="hp-section-title">How it works</h2>
          <p className="hp-section-sub">Get your team up and running in minutes.</p>
        </div>
        <div className="hp-hiw-grid">
          {HOW_IT_WORKS.map((item, i) => (
            <div className="hp-hiw-card" key={item.step}>
              <div className="hp-hiw-step">{item.step}</div>
              {i < HOW_IT_WORKS.length - 1 && <div className="hp-hiw-connector" />}
              <h3 className="hp-hiw-title">{item.title}</h3>
              <p className="hp-hiw-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
    {showModal && <CreateProjectModal onClose={() => setShowModal(false)} 
                  onProjectCreated={handleProjectCreated}
                  />}

                 

    </>
  );
}
