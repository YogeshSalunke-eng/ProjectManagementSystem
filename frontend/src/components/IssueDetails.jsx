import React, { useState,useEffect } from "react";
import "./IssueDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const IssueDetails = () => {
  const {id}=useParams();
  const[issue,setIssue]=useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const { user, loading } = useAuth();

  const navigate=useNavigate();

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

      console.log(data);
    } catch (err) {
      console.error("Error loading issue:", err);
    }
  };
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


const handleDelete = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this issue?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:8080/api/issues/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to delete issue");
    }

    navigate(`/projects/${issue.project.id}`, { replace: true });

  } catch (err) {
    console.error("Error deleting issue:", err);
  }
};
const handleAddComment=async()=>{
  if(!comment.trim()) return;
try{
  const response=await fetch(`http://localhost:8080/api/issue/${issue.id}/user/&{user.id}`,{
    method:"POST",
    credentials:"include",
    body: JSON.stringify({ content: comment })
  });
if(!response.ok){
  console.log("failed to add commennt!!!!!!");
}
const newComment=await response.json();
setComments((prev)=>[...prev,newComment]);
setComment("");
}

catch(error){
  console.log("error in loading comment", error)
}
};

const useEffect(()=>{
  const fetchComments=async()=>{
    try{
   const res=await fetch(`http://localhost:8080/api/comments/issue/${issue.id}`,{
    Credentials:"include"
  });
  const data=res.json();
  setComments(data);
}
catch(error){
}
}
;if(issue?.id) fetchComments();
},[issue.id]);







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
            <div className="avatar">{issue.avatar}</div>
            <input
              type="text"
              placeholder="add a comment..."
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
            />
            <button className="save-btn" onClick={handleAddComment}>
              save
            </button>
          </div>

            <div className="comment-list">
            {comments.map((c) => (
              <div key={c.id} className="comment-item">
                <div className="avatar">{c.avatar}</div>
                <div>
                  <strong>{c.fullname}</strong>
                  <p>{c.content}</p>
                </div>
              </div>
            ))}
          </div>  
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
            <span>  {issue.releasedate}
</span>
          </div>

          <div className="detail-row">
            <span>Reporter</span>
            <span className="badge">{issue.reporter?.fullname||"reporter"}</span>
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