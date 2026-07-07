import { FaBell, FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar({ isOpen, setIsOpen }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white shadow h-16 flex justify-between items-center px-4 md:px-6">
      {/* Left Section - Hamburger & Title */}
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black text-xl font-extrabold rounded cursor-pointer hover:text-gray-600 transition-colors duration-200"
        >
          ☰
        </button>
        <h1 className="text-base md:text-xl lg:text-2xl font-semibold truncate">
          School Management
        </h1>
      </div>

      {/* Right Section - Notifications & User */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Notification Bell */}
        <FaBell
          size={20}
          className="cursor-pointer text-gray-600 hover:text-blue-600 transition-colors duration-200"
        />

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <NavLink to="/profile/me">
            <FaUserCircle
              size={28}
              className="text-blue-700 cursor-pointer hover:text-blue-900 transition-colors duration-200"
            />
          </NavLink>

          {/* User Info - Hidden on very small screens */}
          <div className="hidden sm:block">
            <p className="font-semibold capitalize text-sm md:text-base">
              {user?.fullName || "User"}
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              {user?.role || "Role"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;