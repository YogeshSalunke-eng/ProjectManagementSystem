import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import filterImg from "../assets/filter.png";
import "./dashboard.css";

const ProjectList = ({ refreshKey,category, tag, search, onSearch }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:8080/api/projects/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Delete failed");
    }
    setProjects(prev => prev.filter(p => p.id !== id));

  } catch (err) {
    console.error(err);
    alert("Failed to delete project");
  }
};

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/projects", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch projects");

        const data = await res.json();

        setProjects(
          data.map((p) => ({
            id: p.id,
            title: p.name,
            type: p.category,
            description: p.description,
            tags: p.tags,
          }))
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [refreshKey]);

  const filteredProjects = projects.filter((p) => {
  const categoryMatch = category === "all" || p.type === category;

  const tagMatch =
    tag === "all" || (Array.isArray(p.tags) && p.tags.includes(tag));

  const searchMatch =
    (p.title?.toLowerCase().includes(search.toLowerCase()) || false) ||
    (p.description?.toLowerCase().includes(search.toLowerCase()) || false);

  return categoryMatch && tagMatch && searchMatch;
});

  return (
    <div className="project-list">
      <div className="project-search">
        <input
          className="search"
          placeholder="search project..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
        <img src={filterImg} className="project-search-filter-icon" />
      </div>

      {loading ? (
        <p style={{ color: "#94a3b8" }}>Loading projects...</p>
      ) : filteredProjects.length === 0 ? (
        <p style={{ color: "#94a3b8" }}>No projects found</p>
      ) : (
        filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} ondelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default ProjectList;
