import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function ClassList() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchClasses = async () => {
    try {
      setLoading(true);

      const res = await api.get("/classes");

      setClasses(res.data);
    } catch (err) {
      console.log(err);

      setError("Failed to load classes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/classes/${id}`);

      setClasses((prev) => prev.filter((cls) => cls._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete class");
    }
  };

  const filteredClasses = classes.filter((cls) => {
    const text = `
      ${cls.name || ""}
      ${cls.grade || ""}
      ${cls.section || ""}
      ${cls.homeroomTeacher?.firstName || ""}
      ${cls.homeroomTeacher?.lastName || ""}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="text-white mb-4 bg-pink-600 px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors duration-200 inline-flex items-center gap-2"
      >
        ← Back
      </button>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
        <h1 className="text-2xl font-bold">Classes</h1>

        <button
          onClick={() => navigate("/classes/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto hover:bg-blue-700 transition-colors duration-200"
        >
          + Add Class
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* SEARCH */}
      {!loading && (
        <input
          type="text"
          placeholder="Search class by name, grade, section or teacher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-2.5 rounded-lg w-full mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredClasses.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No classes found</p>
          <p className="text-gray-400 mt-2">
            {search
              ? `No class matches "${search}"`
              : 'Click "Add Class" to create a class'}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">#</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Grade</th>
                  <th className="p-3">Section</th>
                  <th className="p-3">Teacher</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.map((cls, index) => (
                  <tr key={cls._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-semibold">{cls.name}</td>
                    <td className="p-3">{cls.grade}</td>
                    <td className="p-3">{cls.section}</td>
                    <td className="p-3">
                      {cls.homeroomTeacher ? (
                        <span className="text-green-600">
                          {cls.homeroomTeacher.firstName}{" "}
                          {cls.homeroomTeacher.lastName}
                        </span>
                      ) : (
                        <span className="text-yellow-600">Not Assigned</span>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => navigate(`/classes/${cls._id}`)}
                          className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => navigate(`/classes/edit/${cls._id}`)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cls._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredClasses.map((cls, index) => (
              <div key={cls._id} className="bg-white shadow rounded-lg p-4 border">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-gray-500 text-sm">#{index + 1}</span>
                    <h3 className="font-semibold text-lg">{cls.name}</h3>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {cls.grade} - {cls.section}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Teacher:</span>{" "}
                    {cls.homeroomTeacher ? (
                      <span className="text-green-600">
                        {cls.homeroomTeacher.firstName} {cls.homeroomTeacher.lastName}
                      </span>
                    ) : (
                      <span className="text-yellow-600">Not Assigned</span>
                    )}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-3 border-t">
                  <button
                    onClick={() => navigate(`/classes/${cls._id}`)}
                    className="flex-1 bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/classes/edit/${cls._id}`)}
                    className="flex-1 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cls._id)}
                    className="flex-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Results Counter */}
          <div className="mt-4 text-sm text-gray-500 text-center">
            Showing {filteredClasses.length} of {classes.length} classes
          </div>
        </>
      )}
    </div>
  );
}

export default ClassList;