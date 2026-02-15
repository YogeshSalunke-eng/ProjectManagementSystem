import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import TaskBoard from "./TaskBoard";
import IssueDetails from "./IssueDetails";

const BoardPage = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTaskStatus = (id, status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  return (
    <Routes>
  <Route path="/" element={<TaskBoard projectId={1} />} />
  <Route path="/issue/:id" element={<IssueDetails />} />
</Routes>

  );
};

export default BoardPage;
