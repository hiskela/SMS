import { FaBell, FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
function Navbar({isOpen, setIsOpen}) {
const {user}=useContext(AuthContext)
  return (
    <div className="bg-white shadow h-16 flex justify-between items-center px-6">
  <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1 bg-blue-600 text-white rounded "
      >
        ☰
      </button>
      <h1 className="text-2xl font-semibold">
        School Management System
      </h1>

      <div className="flex items-center gap-5">

        <FaBell
          size={22}
          className="cursor-pointer text-gray-600 shadow-lg"
        />

        <div className="flex items-center gap-2">

          <FaUserCircle
            size={30}
            className="text-blue-700 cursor-pointer"
          />

          <div>
            <p className="font-semibold capitalize ">{user?.fullName}</p>
            <p className="text-sm text-gray-500">
              {user?.role}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Navbar;