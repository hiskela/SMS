import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ClassList() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // GET ALL CLASSES
  const fetchClasses = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:3000/api/classes");

      setClasses(res.data);
    } catch (err) {
      setError("Failed to load classes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // DELETE CLASS
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this class?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/classes/${id}`);
      fetchClasses(); // refresh list
    } catch (err) {
      alert("Failed to delete class");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Classes</h1>

        <button
          onClick={() => navigate("/classes/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Class
        </button>
      </div>

      {loading && <p>Loading classes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && classes.length === 0 && (
        <p>No classes found.</p>
      )}

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Grade</th>
            <th className="p-2 border">Section</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {classes.map((cls) => (
            <tr key={cls._id}>
              <td className="p-2 border">{cls.name}</td>
              <td className="p-2 border">{cls.grade}</td>
              <td className="p-2 border">{cls.section}</td>

              <td className="p-2 border space-x-2">
                <button
                  onClick={() => navigate(`/classes/edit/${cls._id}`)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(cls._id)}
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
  );
}

export default ClassList;