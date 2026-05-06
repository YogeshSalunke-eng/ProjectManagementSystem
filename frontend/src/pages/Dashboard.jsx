import { useState } from "react";
import "./Dashboard.css";
import Filters from "./Filters";
import Navbar from "./Navbar";
import ProjectList from "./ProjectList";
import CreateProjectModal from "./CreateProjectModal";
const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
const [category, setCategory] = useState("all");
  const [tag, setTag] = useState("all");
  const [search, setSearch] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const API = import.meta.env.VITE_API_URL || "/api";

const handleProjectCreated = () => {
  setRefreshKey(prev => prev + 1);
};
  return (
    <>
      <Navbar onNewProject={() => setShowModal(true)} />
      <div className="dashboard">
<Filters
          category={category}
          tag={tag}
          onCategoryChange={setCategory}
          onTagChange={setTag}/>    
<ProjectList
          category={category}
          tag={tag}
          search={search}
          onSearch={setSearch}
          refreshKey={refreshKey}
        />        
      </div>
            {showModal && <CreateProjectModal onClose={() => setShowModal(false)} 
              onProjectCreated={handleProjectCreated}
              />}

    </>
  );
};

export default Dashboard;
