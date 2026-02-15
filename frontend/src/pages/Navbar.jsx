import "./dashboard.css";
import { useState,useEffect,useRef } from "react";
import profileImg from "../assets/profile.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ onNewProject }) => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
   const [open, setOpen] = useState(false);
  const popupRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h3>Project Management</h3>
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>
          Home
        </button>
        <button className="nav-btn" onClick={onNewProject}>
          New Project
        </button>
        <button className="nav-btn" onClick={() => navigate("/upgrade")}>
          Upgrade
        </button>
      </div>

      <div className="nav-right">
        <img src={profileImg} className="profile-img"
        onClick={() => setOpen(!open)} />
        <div className="profile">
          {loading ? "Loading..." : user?.fullname || "User"}
        </div>
{open && (
          <div className="profile-popup">
            <h3 className="fullname">{user.fullname}</h3>
                        <p className="email">{user.email}</p>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
