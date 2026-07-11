import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { NavLink } from "react-router-dom";
function AttendanceHistory() {
  const { assignmentId } = useParams();

  const navigate = useNavigate();

  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const res = await api.get(`/attendance/summary/${assignmentId}`);

        setSummary(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, [assignmentId]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
 <NavLink to="/teacher/assignments"
            className="text-white mb-3 bg-pink-600 p-1 rounded "
          >
            ← Back
          </NavLink>
      <h1 className="text-3xl font-bold mb-6">Attendance History</h1>

      {loading && <p>Loading attendance...</p>}

      {summary.length === 0 && !loading && (
        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500">No attendance records found.</p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {summary.map((item) => (
          <div key={item._id} className="bg-white shadow rounded-xl p-5">
            <h2 className="text-xl font-bold mb-4">{item._id}</h2>

            <div className="space-y-2">
              <p className="text-green-600 font-semibold">
                Present:
                {item.present}
              </p>

              <p className="text-red-600 font-semibold">
                Absent:
                {item.absent}
              </p>

              <p className="text-yellow-600 font-semibold">
                Late:
                {item.late}
              </p>
            </div>

            <button
              onClick={() =>
                navigate(
                  `/teacher/attendance/details/${assignmentId}/${item._id}`,
                )
              }
              className="
mt-5
w-full
bg-blue-600
text-white
py-2
rounded-lg
"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AttendanceHistory;
