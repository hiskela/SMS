
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
  FaCog,
  FaSignOutAlt
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
{user?.role === "admin" && (
  <>

            {/* Dashboard */}
            <NavLink to="/dashboard" className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
              <FaHome /> Dashbord
            </NavLink>

            {/* Students */}
            <NavLink to="/students" className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
              <FaUserGraduate /> Students
            </NavLink>

            {/* Teachers */}
            <NavLink to="/teachers" className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
              <FaChalkboardTeacher /> Teachers
            </NavLink>

            {/* Classes */}
            <NavLink to="/classes" className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
              <FaSchool /> Classes
            </NavLink>

            {/* Subjects */}
            <NavLink to="/subjects" className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
              📘 Subjects
            </NavLink>

            {/* Settings */}
            <NavLink to="/settings" className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
              <FaCog /> Settings
            </NavLink>
 <NavLink to="/profile" className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
              <FaCog /> Profile
            </NavLink>
         
  </>
)}{user?.role === "teacher" && (
  <>
    <NavLink
      to="/dashboard"
      className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded"
    >
      <FaHome /> Dashboard
    </NavLink>

    <NavLink
      to="/my-classes"
      className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded"
    >
      <FaSchool /> My Classes
    </NavLink>

    <NavLink
      to="/students"
      className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded"
    >
      <FaUserGraduate /> My Students
    </NavLink>

    <NavLink
      to="/profile"
      className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded"
    >
      <FaCog /> Profile
    </NavLink>
  </>
)}{user?.role === "student" && (
  <>
    <NavLink
      to="/dashboard"
      className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded"
    >
      <FaHome /> Dashboard
    </NavLink>

    <NavLink
      to="/profile"
      className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded"
    >
      <FaCog /> My Profile
    </NavLink>

    <NavLink
      to="/subjects"
      className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded"
    >
      📘 My Subjects
    </NavLink>
  </>
)}
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