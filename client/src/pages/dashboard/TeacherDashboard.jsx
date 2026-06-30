import { useEffect, useState } from "react";
import axios from "axios";

function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "http://localhost:3000/api/students"
        );

        setStudents(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Teacher Dashboard 👨‍🏫</h1>

      <p className="text-gray-500 mt-2">
        Manage your students and classes
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-gray-500">Total Students</h2>
          <p className="text-3xl font-bold">
            {loading ? "..." : students.length}
          </p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-gray-500">Active Students</h2>
          <p className="text-3xl font-bold">
            {loading
              ? "..."
              : students.filter((s) => s.status === "Active").length}
          </p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-gray-500">Female Students</h2>
          <p className="text-3xl font-bold">
            {loading
              ? "..."
              : students.filter((s) => s.gender === "Female").length}
          </p>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">
          Recent Students
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-2">
            {students.slice(0, 5).map((student) => (
              <li key={student._id} className="border-b py-2">
                {student.firstName} {student.lastName} -{" "}
                {student.grade}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;