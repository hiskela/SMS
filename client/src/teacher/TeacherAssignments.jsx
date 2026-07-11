import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
function TeacherAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await api.get("/teaching-assignments/my-assignments");

        setAssignments(res.data);
      } catch (err) {
        console.log(err);

        setError(err.response?.data?.message || "Failed to load assignments");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading assignments...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
 <NavLink to="/dashboard"
            className="text-white mb-2 bg-pink-600 p-1 rounded"
          >
            ← Back
          </NavLink>
      <h1 className="text-3xl font-bold mb-6">My Teaching Assignments</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-5">{error}</div>
      )}

      {assignments.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-gray-500">No subjects assigned yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((item) => (
            <div key={item._id} className="bg-white shadow rounded-xl p-6">
              <h2 className="text-xl font-bold text-blue-700">
                {item.subject?.name}
              </h2>

              <div className="mt-3 text-gray-600">
                <p>
                  <strong>Class:</strong> {item.class?.name}
                </p>

                <p>
                  <strong>Grade:</strong> {item.class?.grade}
                </p>

                <p>
                  <strong>Semester:</strong> {item.semester}
                </p>
              </div>

              <button
                onClick={() => navigate(`/teacher/attendance/${item._id}`)}
                className="
                mt-5
                w-full
                bg-green-600
                hover:bg-green-700
                text-white
                py-2
                rounded-lg
cursor-pointer
                "
              >
                Take Attendance
              </button>
<button
  onClick={() =>
    navigate(`/teacher/attendance-history/${item._id}`)
  }
  className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
>
  View Attendance
</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherAssignments;
