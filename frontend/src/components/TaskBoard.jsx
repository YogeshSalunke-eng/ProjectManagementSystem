import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateIssueModal from "./CreateIssueModal";
import "./taskboard.css";
import IssueDetails from "./IssueDetails";
const TaskBoard = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeStatus, setActiveStatus] = useState("todo");
  const navigate = useNavigate();

  // 🔹 Load issues from backend
  useEffect(() => {
    if (projectId) {
      loadIssues();
    }
  }, [projectId]);

  const loadIssues = async () => {
    try {
      const res = await fetch(
        `http://localhost:8090/api/issues/project/${projectId}`,
        { credentials: "include" }
      );

      const data = await res.json();
      console.log("Issues from backend:", data);
      setTasks(data || []);
    } catch (err) {
      console.error("Error loading issues:", err);
    }
  };

  // 🔹 Create Issue (POST to backend)
  const addTask = async (task) => {
    try {
      const res = await fetch("http://localhost:8090/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          status: activeStatus,
          project: { id: projectId },
          assignee: task.assignTo
    ? { id: Number(task.assignTo) }
    : null
        }),
      });

      if (!res.ok) throw new Error("Failed to create issue");

      setShowModal(false);
      await loadIssues(); // reload from DB
    } catch (err) {
      console.error("Error creating issue:", err);
    }
  };

  const renderTasks = (status) =>
  tasks
    .filter(
      (task) =>
        task.status?.toLowerCase().replace("_", "-") === status
    )
    .map((task) => (
        <div
          key={task.id}
          className="task-card"
          onClick={() => navigate(`/issue/${task.id}`)}
        >
          <div className="task-title">title : {task.title}</div>
          <div className="task-desc">description : {task.description}</div>
<div>
  assignee : {task.assignee ? task.assignee.fullname : "Unassigned"}
</div>
</div>
      ));
const removeTaskFromBoard = (issueId) => {
  setTasks((prevTasks) =>
    prevTasks.filter((task) => task.id !== issueId)
  );
};

  return (
    <div className="taskboard">
      {/* TODO */}
      <div className="column">
        <h4>Todo</h4>
        {renderTasks("todo")}
        <p
          className="create-issue"
          onClick={() => {
            setActiveStatus("todo");
            setShowModal(true);
          }}
        >
          + Create Issue
        </p>
      </div>

      {/* IN PROGRESS */}
      <div className="column">
        <h4>In Progress</h4>
        {renderTasks("in-progress")}
        <p
          className="create-issue"
          onClick={() => {
            setActiveStatus("in-progress");
            setShowModal(true);
          }}
        >
          + Create Issue
        </p>
      </div>

      {/* DONE */}
      <div className="column">
        <h4>Done</h4>
        {renderTasks("done")}
        <p
          className="create-issue"
          onClick={() => {
            setActiveStatus("done");
            setShowModal(true);
          }}
        >
          + Create Issue
        </p>
      </div>

      {showModal && (
        <CreateIssueModal
          onClose={() => setShowModal(false)}
          onCreate={addTask}
        />
      )}
    </div>
  );
};

export default TaskBoard;
