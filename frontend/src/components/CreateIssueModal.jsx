


import { useState,useEffect } from "react";
import "./taskboard.css";

const CreateIssueModal = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const[reporter,setReporter]=useState(" ");
const[users,setusers]=useState([]);

useEffect(() => {
  const loadUsers = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/usersall", {
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




  const submitHandler = () => {
  if (!title.trim()) return;



  onCreate({
    title,
    description,
    assignTo
  });

  setTitle("");
  setDescription("");
  setAssignTo("");
};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Create New Issue</h3>

        <input
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitHandler()}
        />

        <input
          placeholder="describe your task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
  value={assignTo}
  onChange={(e) => setAssignTo(e.target.value)}
>
  <option value="">Select user</option>
  {users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.fullname}
    </option>
  ))}
</select>



        <button onClick={submitHandler}>Create Issue</button>
      </div>
    </div>
  );
};

export default CreateIssueModal;






