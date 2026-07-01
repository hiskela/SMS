
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
  FaCog,
  FaSignOutAlt,
FaUserCircle
} from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
function Sidebar({ isOpen }) {
const navigate=useNavigate();
const {user, logout}=useContext(AuthContext)
function handleLogout(){
logout();

navigate("/login")

}
const linkClass = ({ isActive }) =>
  `flex items-center gap-2 p-2 rounded transition ${
    isActive ? "bg-blue-700 text-white" : "hover:bg-blue-600"
  }`;
  return (
    <aside
      className={`bg-blue-900 text-white min-h-screen rounded-b-2xl transition-all ${
        isOpen ? "w-64 p-4" : "w-0 p-0 overflow-hidden"
      }`}
    >
      {isOpen && (
        <>
          <h2 className="text-xl font-bold mb-6">SMS {user?.role?.charAt(0).toUpperCase()+user?.role?.slice(1)}</h2>

          <nav className="flex flex-col gap-2">
    {/* Dashboard */}
            <NavLink to="/dashboard" className={linkClass}>
              <FaHome /> Dashbord
            </NavLink>

{user?.role === "admin" && (
  <>

        
            {/* Students */}
            <NavLink to="/students"className={linkClass}>
              <FaUserGraduate /> Students
            </NavLink>

            {/* Teachers */}
            <NavLink to="/teachers" className={linkClass}>
              <FaChalkboardTeacher /> Teachers
            </NavLink>

            {/* Classes */}
            <NavLink to="/classes" className={linkClass}>
              <FaSchool /> Classes
            </NavLink>

            {/* Subjects */}
            <NavLink to="/subjects" className={linkClass}>
              📘 Subjects
            </NavLink>

          
 
         
  </>
)}{user?.role === "teacher" && (
  <>
    

    <NavLink
      to="/my-classes"
  className={linkClass}
    >
      <FaSchool /> My Classes
    </NavLink>

    <NavLink
      to="/students"
     className={linkClass}
    >
      <FaUserGraduate /> My Students
    </NavLink>

    
  </>
)}{user?.role === "student" && (
  <>
   

 

    <NavLink
      to="/subjects"
 className={linkClass}
    >
      📘 My Subjects
    </NavLink>
  </>
)}
   <NavLink
      to="/profile"
    className={linkClass}
    >
      <FaUserCircle /> My Profile
    </NavLink>
  {/* Settings */}
            <NavLink to="/settings" className={linkClass}>
              <FaCog /> Settings
            </NavLink>
   {/* Logout */}
            <button className="flex items-center gap-2 p-2 mt-6 bg-red-600 hover:bg-red-700 rounded" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </nav>
        </>
      )}
    </aside>
  );
}

export default Sidebar;