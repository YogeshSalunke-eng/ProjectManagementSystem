import {Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./components/ProjectDetails";
import Pricing from "./subscription/Pricing";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import IssueDetails from "./components/IssueDetails";
import ForgetPassword from "./authentication/ForgetPassword";
function App() {
  return (
      
      <Routes>
        <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
             <Route path="/upgrade" element={<Pricing />} />    
                     <Route path="/issue/:id" element={<IssueDetails />} />
                     <Route path="/forgetpassword" element={<ForgetPassword/>}/>
               </Routes>

);
}

export default App;
