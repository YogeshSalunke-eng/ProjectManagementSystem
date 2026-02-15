import { useState } from "react";
import "./dashboard.css";
import Filters from "./Filters";
import Navbar from "./Navbar";
import ProjectList from "./ProjectList";
import CreateProjectModal from "./CreateProjectModal";
const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
const [category, setCategory] = useState("all");
  const [tag, setTag] = useState("all");
  const [search, setSearch] = useState("");
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
        />        
      </div>
            {showModal && <CreateProjectModal onClose={() => setShowModal(false)} />}

    </>
  );
};

export default Dashboard;
