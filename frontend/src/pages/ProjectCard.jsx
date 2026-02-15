

import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div
      className="project-card"
onClick={() => navigate(`/projects/${project.id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="project-header">
        <h3>{project.title}</h3>
        <span className="badge">{project.type}</span>
      </div>

      <p className="description">{project.description}</p>

      <div className="tags">
        {project.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
