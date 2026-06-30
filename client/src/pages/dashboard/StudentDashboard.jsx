import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function StudentDashboard() {
  const { user } = useContext(AuthContext);

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "http://localhost:3000/api/students"
        );

        const found = res.data.find(
          (s) => s.email === user.email
        );

        setStudent(found);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchStudent();
  }, [user]);

  if (loading) return <h2>Loading...</h2>;

  if (!student)
    return <h2>No student data found</h2>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">
        Student Dashboard 🎓
      </h1>

      <div className="mt-6 bg-white shadow p-6 rounded">
        <h2 className="text-xl font-semibold">
          Welcome {student.firstName}
        </h2>

        <p>Grade: {student.grade}</p>
        <p>Gender: {student.gender}</p>
        <p>Phone: {student.phone}</p>
        <p>Address: {student.address}</p>
      </div>
    </div>
  );
}

export default StudentDashboard;