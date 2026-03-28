

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project,ondelete}) => {
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
      <div className="project-header"> 
      <div className="tags">
        {project.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
      <button className="badge" onClick={(e)=>{ e.stopPropagation(); ondelete(project.id)}}>delete project</button>
      </div>  
    </div>
  );
};

export default ProjectCard;
