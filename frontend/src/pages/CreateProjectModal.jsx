import { useState,useEffect } from "react";
import "./dashboard.css";

const CreateProjectModal = ({ onClose, onProjectCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("fullstack");
  const [tags, setTags] = useState([]);
  const[team,setteam]=useState([]);
  const[users,setusers]=useState([]);
  
useEffect(() => {
  const loadUsers = async () => {
    try {
      const res = await fetch("http://localhost:8090/auth/usersall", {
        credentials: "include"
      });

      const data = await res.json();
      console.log(data);
      setusers(data);
    } catch (err) {
      console.error("Error loading users:", err);
    }
  };

  loadUsers();
}, []);


  const availableTags = ["html","css","javascript","react",
"java","spring","springboot","sql","hibernate","data jpa"  ];

  const toggleTag = (tag) => {
    setTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };
const toggleMember = (user) => {
  setteam((prev) =>
    prev.find((u) => u.id === user.id)
      ? prev.filter((u) => u.id !== user.id)
      : [...prev, user]
  );
};

  const createProject = async () => {
    if (!name || !description) return;

    try {
      const res = await fetch("http://localhost:8090/api/projects", {
        method: "POST",
        credentials: "include", // 🔥 cookie-based JWT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          category,
          tags,
 team: team.map(u => ({ id: u.id })) 
   }),
      });

      if (!res.ok) throw new Error("Project creation failed");

      onProjectCreated(); // refresh project list
      onClose();          // close modal
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Create New Project</h3>
          <span className="close" onClick={onClose}>×</span>
        </div>

        <input
          type="text"
          placeholder="project name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="fullstack">Full Stack</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>

        <select onChange={(e) => toggleTag(e.target.value)}>
          <option>Tags</option>
          {availableTags.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <div className="selected-tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag} ✕
            </span>
          ))}
        </div>
<select onChange={(e) => {
  const selectedUser = users.find(
    (u) => u.id === Number(e.target.value)
  );
  if (selectedUser) toggleMember(selectedUser);
}}>
  <option>Select Members</option>
  {users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.fullname}
    </option>
  ))}
</select>

<div className="selected-tags">
  {team.map((user) => (
    <span key={user.id} className="tag" onClick={() => toggleMember(user)}>
      {user.fullname} ✕
    </span>
  ))}
</div>



        <button className="create-btn" onClick={createProject}>
          Create Project
        </button>
      </div>
    </div>
  );
};

export default CreateProjectModal;
