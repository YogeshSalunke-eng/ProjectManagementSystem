import React, { useState, useEffect, useRef } from "react";
import "./IssueDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const IssueDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  // 🔹 Auto scroll to latest comment
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  // 🔹 Load issue
  useEffect(() => {
    loadIssue();
  }, [id]);

  const loadIssue = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/issues/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      setIssue(data);
    } catch (err) {
      console.error("Error loading issue:", err);
    }
  };

  // 🔹 Load comments when issue loads
  useEffect(() => {
    if (!issue?.id) return;

    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/comments/issue/${issue.id}`,
          { credentials: "include" }
        );
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error("Error loading comments:", err);
      }
    };

    fetchComments();
  }, [issue?.id]);

  // 🔹 Status update
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    try {
      await fetch(
        `http://localhost:8080/api/issues/${id}/status?status=${newStatus}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      loadIssue();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // 🔹 Priority update
  const handlePriorityChange = async (e) => {
    const newPriority = e.target.value;

    try {
      await fetch(`http://localhost:8080/api/issues/${id}`, {
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

  // 🔹 Delete issue
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this issue?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/issues/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      navigate(`/projects/${issue.project.id}`, { replace: true });
    } catch (err) {
      console.error("Error deleting issue:", err);
    }
  };

  // 🔹 Add comment
  const handleAddComment = async () => {
    if (!comment.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/comments/issue/${issue.id}/user/${user.id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: comment }),
        }
      );

      if (!res.ok) throw new Error("Failed to add comment");

      const newComment = await res.json();

      // newest on top
      setComments((prev) => [newComment, ...prev]);
      setComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  if (!issue) return <div>Loading...</div>;

  return (
    <div className="project-container">
      {/* LEFT SECTION */}
      <div className="left-section">
        <h2 className="title">{issue.title}</h2>

        <div className="description">
          <h4>Description</h4>
          <p>{issue.description}</p>
        </div>

        <button className="delete-btn" onClick={handleDelete}>
          Delete Issue
        </button>

        {/* Activity */}
        <div className="activity">
          <h4>Activity</h4>

          <div className="tabs">
            <button className="tab">All</button>
            <button className="tab active">Comments</button>
            <button className="tab">History</button>
          </div>

          {/* Comment input */}
          <div className="comment-input">
            <div className="avatar">
              {user?.fullname?.charAt(0) || "U"}
            </div>

            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button className="save-btn" onClick={handleAddComment}>
              Save
            </button>
          </div>

          {/* Comment list */}
          <div className="comment-list">
            {comments.map((c) => (
              <div key={c.id} className="comment-item">
                <div className="avatar">
                  {c.user?.fullname?.charAt(0) || "U"}
                </div>

                <div>
                  <div className="upper-portion">
                    <strong>{c.user?.fullname || "User"}</strong>
                    <p className="comment-time">{c.createDateTime}</p>
                  </div>
                  <p className="comment-content">{c.content}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="right-section">
        <select
          className="status-dropdown"
          value={issue.status}
          onChange={handleStatusChange}
        >
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
            <span>Status</span>
            <span className="status">{issue.status}</span>
          </div>

          <div className="detail-row">
            <span>Release</span>
            <span>{issue.releaseDate}</span>
          </div>

          <div className="detail-row">
            <span>Reporter</span>
            <span className="badge">
              {issue.reporter?.fullname || "Reporter"}
            </span>
          </div>

          <div className="detail-row">
            <span>Priority</span>
            <select
              className="status-dropdown"
              value={issue.priority}
              onChange={handlePriorityChange}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;