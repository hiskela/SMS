import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaBook,
} from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Sidebar({ isOpen }) {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-700 text-white"
        : "hover:bg-blue-800 text-gray-100"
    }`;

  return (
    <aside
      className={`bg-blue-900 text-white min-h-screen transition-all duration-300 ${
        isOpen ? "w-64 p-5" : "w-0 p-0 overflow-hidden"
      }`}
    >
      {isOpen && (
        <>
          {/* Logo */}
          <div className="border-b border-blue-700 pb-4 mb-6">
            <h1 className="text-2xl font-bold">
              School MS
            </h1>

            <p className="text-sm text-blue-200 mt-2">
              {user?.username}
            </p>

            <span className="inline-block mt-1 text-xs bg-blue-700 px-2 py-1 rounded-full capitalize">
              {user?.role}
            </span>
          </div>

          <nav className="flex flex-col gap-2">

            <NavLink to="/dashboard" className={linkClass}>
              <FaHome />
              Dashboard
            </NavLink>

            {/* ADMIN */}
            {user?.role === "admin" && (
              <>
                <NavLink to="/students" className={linkClass}>
                  <FaUserGraduate />
                  Students
                </NavLink>

                <NavLink to="/teachers" className={linkClass}>
                  <FaChalkboardTeacher />
                  Teachers
                </NavLink>

                <NavLink to="/classes" className={linkClass}>
                  <FaSchool />
                  Classes
                </NavLink>

                <NavLink to="/subjects" className={linkClass}>
                  <FaBook />
                  Subjects
                </NavLink>
              </>
            )}

            {/* TEACHER */}
            {user?.role === "teacher" && (
              <>
                <NavLink to="/my-classes" className={linkClass}>
                  <FaSchool />
                  My Classes
                </NavLink>

                <NavLink to="/students" className={linkClass}>
                  <FaUserGraduate />
                  My Students
                </NavLink>

                <NavLink to="/subjects" className={linkClass}>
                  <FaBook />
                  My Subjects
                </NavLink>
              </>
            )}

            {/* STUDENT */}
            {user?.role === "student" && (
              <>
                <NavLink to="/subjects" className={linkClass}>
                  <FaBook />
                  My Subjects
                </NavLink>
              </>
            )}

            <NavLink to="/profile/me" className={linkClass}>
              <FaUserCircle />
              My Profile
            </NavLink>

            <NavLink to="/settings" className={linkClass}>
              <FaCog />
              Settings
            </NavLink>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 mt-8 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>

          </nav>
        </>
      )}
    </aside>
  );
}

export default Sidebar;