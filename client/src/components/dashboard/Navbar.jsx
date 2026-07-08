import { FaBell, FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useSettings } from "../../context/SettingsContext";
function Navbar({ isOpen, setIsOpen }) {
  const { user } = useContext(AuthContext);
const {settings}=useSettings();
const [profile, setProfile]=useState(null)
useEffect(() => {
  const loadProfile = async () => {
    try {
      const res = await api.get("/profile/me");
      setProfile(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  loadProfile();
}, []);
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
       {settings?.schoolName}
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
  {profile?.avatar ? (
    <img
      src={`http://localhost:3000${profile.avatar}`}
      alt="Profile"
      className="w-10 h-10 rounded-full object-cover border-2 border-blue-600 hover:border-blue-800 transition"
    />
  ) : (
    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
      {profile?.firstName?.charAt(0) || user?.username?.charAt(0) || "U"}
    </div>
  )}
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