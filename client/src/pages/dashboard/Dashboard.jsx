import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import AdminDashboard from "./AdminDashboard";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";

function Dashboard() {
  const { user } = useContext(AuthContext);

  // IMPORTANT: wait until user loads
  if (!user) {
    return <h2>Loading...</h2>;
  }


  switch (user.role) {
    case "admin":
      return <AdminDashboard />;

    case "teacher":
      return <TeacherDashboard />;

    case "student":
      return <StudentDashboard />;

    default:
      return <h2>Invalid Role</h2>;
  }
}

export default Dashboard;