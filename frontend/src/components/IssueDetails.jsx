import React, { useState,useEffect } from "react";
import "./IssueDetails.css";
import { useNavigate, useParams } from "react-router-dom";

const IssueDetails = () => {
  const {id}=useParams();
  const[issue,setIssue]=useState(null);
  const [comment, setComment] = useState("");

  const navigate=useNavigate();

  useEffect(() => {
    loadIssue();
  }, [id]);

  const loadIssue = async () => {
    try {
      const res = await fetch(`http://localhost:8090/api/issues/${id}`, {
        credentials: "include",
      });

      const data = await res.json();
      setIssue(data);

      console.log(data);
      //console.log(issue);
    } catch (err) {
      console.error("Error loading issue:", err);
    }
  };
  const handleStatusChange = async (e) => {
  const newStatus = e.target.value;
  try {
    await fetch(
      `http://localhost:8090/api/issues/${id}/status?status=${newStatus}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    loadIssue(); // reload updated issue
  } catch (err) {
    console.error("Error updating status:", err);
  }
};


  const handlePriorityChange = async (e) => {
  const newPriority = e.target.value;

  try {
    await fetch(`http://localhost:8090/api/issues/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...issue,
        priority: newPriority,
      }),
    });

    loadIssue();
  } catch (err) {
    console.error("Error updating priority:", err);
  }
};


const handleDelete = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this issue?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:8090/api/issues/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to delete issue");
    }

    navigate(`/project/${issue.project.id}`, { replace: true });

  } catch (err) {
    console.error("Error deleting issue:", err);
  }
};


  if (!issue) return <div>Loading...</div>;

  return (
    <div className="project-container">
      <div className="left-section">
        <h2 className="title">{issue.title}</h2>

        <div className="description">
          <h4>Description</h4>
          <p>{issue.description}</p>
        </div>
<button className="delete-btn" onClick={handleDelete}>delete Issue</button>
        <div className="activity">
          <h4>Activity</h4>

          <div className="tabs">
            <button className="tab">All</button>
            <button className="tab active">Comments</button>
            <button className="tab">History</button>
          </div>

          <div className="comment-input">
            <div className="avatar">Y</div>
            <input
              type="text"
              placeholder="add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="save-btn">
              save
            </button>
          </div>

           {/* <div className="comment-list">
            {comments.map((c) => (
              <div key={c.id} className="comment-item">
                <div className="avatar">{c.name[0]}</div>
                <div>
                  <strong>{c.name}</strong>
                  <p>{c.text}</p>
                </div>
              </div>
            ))}
          </div>  */}
        </div>
      </div>

      <div className="right-section">
        <select className="status-dropdown"
        value={issue.status}
        onChange={handleStatusChange}>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <div className="details-card">
          <h4>Details</h4>

          <div className="detail-row">
            <span>Assignee</span>
            <span className="badge">
  {issue.assignee?.fullname || "Unassigned"}
</span>
          </div>

          <div className="detail-row">
            <span>Labels</span>
            <span>None</span>
          </div>

          <div className="detail-row">
            <span>Status</span>
            <span className="status">{issue.status}</span>
          </div>

          <div className="detail-row">
            <span>Release</span>
            <span>-</span>
          </div>

          <div className="detail-row">
            <span>Reporter</span>
            <span className="badge">yogesh</span>
          </div>
           <div className="detail-row">

            <span>Priority</span>
            <select className="status-dropdown"
        value={issue.priority}
        onChange={handlePriorityChange}>
          <option>High</option>
          <option>Low</option>
          <option>Medium</option>
        </select>
                </div>

        </div>
      </div>
    </div>
  );
};

export default IssueDetails;