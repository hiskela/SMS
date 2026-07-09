import { FaBell } from "react-icons/fa";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import api from "../../api/axios";
import { useSettings } from "../../context/SettingsContext";
function Navbar({ isOpen, setIsOpen }) {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const notificationRef = useRef(null);

  const { settings } = useSettings();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const res = await api.get("/notifications");
        setNotifications(res.data);
      } catch (err) {
        console.log("Notification error:", err);
      }
    };
    loadNotifications();
  }, []);

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

  const deleteNotification = async () => {
    try {
      await api.delete(`/notifications/${selectedNotification._id}`);

      setNotifications((prev) =>
        prev.filter((n) => n._id !== selectedNotification._id),
      );

      setSelectedNotification(null);

      setShowNotifications(false);
    } catch (err) {
      console.log(err);
      alert("Failed to delete notification");
    }
  };
const openNotification = async (item) => {
  setSelectedNotification(item);

  if (!item.read) {
    await api.put(`/notifications/${item._id}/read`);

    setNotifications(prev =>
      prev.map(notification =>
        notification._id === item._id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }
};
const markAllAsRead = async () => {
  try {
    await api.put("/notifications/mark-all-read");

    setNotifications(prev =>
      prev.map(notification => ({
        ...notification,
        isRead: true
      }))
    );

  } catch (err) {
    console.log(err);
  }
};
const unreadCount=notifications.filter(
notification=>!notification.isRead).length;
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
        <div ref={notificationRef} className="relative">
          
<div ref={notificationRef} className="relative cursor-pointer"     onClick={() => setShowNotifications(!showNotifications)}
>

  <FaBell
    size={20}
    className=" text-gray-600 hover:text-blue-600"
  />

  {unreadCount > 0 && (
    <span
      className="
      absolute
      -top-2
      -right-2
      bg-red-600
      text-white
      text-[10px]
      font-bold
      rounded-full
      min-w-5
      h-5
      flex
      items-center
      justify-center
      px-1
      "
    >
      {unreadCount}
    </span>
  )}

</div>
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-96 p-3 bg-white rounded-xl shadow-xl border z-50">

    <div className="sticky top-0 bg-white border-b p-3 flex justify-between items-center">
  <h3 className="font-bold">
    Notifications
  </h3>

  {notifications.some(n => !n.isRead) && (
    <button
      onClick={markAllAsRead}
      className="text-sm text-blue-600 hover:underline"
    >
      Mark all as read
    </button>
  )}
</div>
              {notifications.length === 0 ? (
                <p className="p-4 text-gray-500">No notifications</p>
              ) : (
  <div className="max-h-126 overflow-y-auto">

                {notifications.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      setSelectedNotification(item);
openNotification(item)
                      setShowNotifications(false);
                    }}
                   className={`p-3 border-b  cursor-pointer rounded-2xl hover:bg-gray-100 ${
    !item.isRead ? "bg-blue-50 border-l-4 border-blue-600" : "border-l-4"
  }`}            >
                    <p>{item.message}</p>

                    <span className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))
}
                                </div>
)

}
            </div>
          )}
        </div>
        {selectedNotification && (
          <div
            className="
fixed inset-0 
bg-black/40 
flex items-center justify-center
z-50
"
          >
            <div
              className="
bg-white 
rounded-xl 
p-6 
w-96
"
            >
              <h2 className="text-xl font-bold mb-3">Notification Details</h2>

              <p className="mb-4">{selectedNotification.message}</p>

              <p className="text-sm text-gray-500 mb-5">
                {new Date(selectedNotification.createdAt).toLocaleString()}
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setSelectedNotification(null);
                  }}
                  className="
px-4 py-2 
bg-gray-300 
rounded
"
                >
                  Cancel
                </button>

                <button
                  onClick={deleteNotification}
                  className="
px-4 py-2 
bg-red-600 
text-white 
rounded
"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

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
                {profile?.firstName?.charAt(0) ||
                  user?.username?.charAt(0) ||
                  "U"}
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
