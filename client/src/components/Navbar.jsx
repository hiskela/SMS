import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
function Navbar() {
    const navigate = useNavigate();
const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setIsLoggedIn(false);
    navigate("/login");
};
    return (
        <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">

            <h1 className="font-bold text-xl">Student System</h1>
<div className="flex gap-6 items-center">

    {isLoggedIn ? (
        <>
            <Link to="/dashboard"                 className="bg-gray-100 hover:bg-green-600 px-3 py-1 text-black rounded">

                Dashboard
            </Link>

            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
                Logout
            </button>
        </>
    ) : (
        <Link to="/login" className="hover:text-gray-200">
            Login
        </Link>
    )}

</div>
        </nav>
    );
}

export default Navbar;