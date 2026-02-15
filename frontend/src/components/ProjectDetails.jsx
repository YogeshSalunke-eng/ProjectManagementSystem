import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../pages/Navbar";
import TaskBoard from "./TaskBoard";
import ChatBox from "./ChatBox";
import "./ProjectDetails.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8090/api/projects/${id}`, {
    credentials: "include", 
  })
      .then((res) => res.json())
      .then((data) => setProject(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!project) return <h2>Loading...</h2>;

  return (
    <div className="project-page">
      <Navbar />

      <div className="project-body">
        <div className="project-main">
          <h2>{project.name}</h2>

          <p className="project-desc">
            {project.description}
          </p>

          <div className="project-meta">
            <p>
              <strong>Project Lead :</strong> {project.owner?.fullname}
            </p>

            <div className="members">
  <strong>Members :</strong>

  <div className="member-list">
    {project.team?.map((member) => (
      <span key={member.id} className="member-avatar">
        {member.avatar}
      </span>
    ))}
  </div>

  <button className="invite-btn">add members +</button>
</div>


            <p>
              <strong>Category :</strong> {project.category}
            </p>

            <span className="status-badge">In Progress</span>
          </div>

          <TaskBoard projectId={id} />
        </div>

        <ChatBox projectId={id} />
      </div>
    </div>
  );
};

export default ProjectDetails;
