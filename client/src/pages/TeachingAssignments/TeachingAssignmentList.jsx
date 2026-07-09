import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

function TeachingAssignmentList() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadAssignments = async () => {
    try {
      setLoading(true);

      const res = await api.get("/teaching-assignments");

      setAssignments(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  const deleteAssignment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this assignment?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/teaching-assignments/${id}`);

      setAssignments((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-pink-600 text-white px-4 py-2 rounded mb-5"
      >
        ← Back
      </button>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teaching Assignments</h1>

        <button
          onClick={() => navigate("/teaching-assignments/add")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Assign Subject
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">#</th>

                <th className="p-3">Teacher</th>

                <th className="p-3">Subject</th>

                <th className="p-3">Class</th>

                <th className="p-3">Semester</th>

                <th className="p-3">Academic Year</th>

                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {assignments.map((a, index) => (
                <tr key={a._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 font-semibold">
                    {a.teacher?.firstName} {a.teacher?.lastName}
                  </td>

                  <td className="p-3">{a.subject?.name}</td>

                  <td className="p-3">{a.class?.name}</td>

                  <td className="p-3">Semester {a.semester}</td>

                  <td className="p-3">{a.academicYear}</td>

                  <td className="p-3">
                    <button
                      onClick={() => deleteAssignment(a._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TeachingAssignmentList;
