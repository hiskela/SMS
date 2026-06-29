import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // later we will replace this with JWT token decoding
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome, {user.username} 👋
      </h1>

      <div className="mt-6 grid grid-cols-3 gap-4">

        <div className="bg-blue-100 p-4 rounded">
          <h2 className="font-bold">Students</h2>
          <p>Manage student records</p>
        </div>

        <div className="bg-green-100 p-4 rounded">
          <h2 className="font-bold">Teachers</h2>
          <p>Manage teacher records</p>
        </div>

        <div className="bg-purple-100 p-4 rounded">
          <h2 className="font-bold">Reports</h2>
          <p>System overview</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;