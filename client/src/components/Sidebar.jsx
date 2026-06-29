import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar({ isOpen }) {
  return (
    <aside
      className={`bg-blue-900 text-white min-h-screen rounded-b-2xl transition-all ${
        isOpen ? "w-64 p-4" : "w-0 p-0 overflow-hidden"
      }`}
    >
      {isOpen && (
        <>
          <h2 className="text-xl font-bold mb-6">SMS Admin</h2>

          <nav className="flex flex-col gap-2">

            {/* Dashboard */}
            <NavLink to="/" className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
              <FaHome /> Dashboard
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

            {/* Logout */}
            <button className="flex items-center gap-2 p-2 mt-6 bg-red-600 hover:bg-red-700 rounded">
              <FaSignOutAlt /> Logout
            </button>

          </nav>
        </>
      )}
    </aside>
  );
}

export default Sidebar;