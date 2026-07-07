import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

function SubjectList() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadSubjects = async () => {
    try {
      setLoading(true);
      const res = await api.get("/subjects");
      setSubjects(res.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load subjects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/subjects/${id}`);
      setSubjects(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete subject");
    }
  };

  const filteredSubjects = subjects.filter((s) => {
    const text = `${s.name || ""} ${s.code || ""}`.toLowerCase();
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
        <h1 className="text-2xl font-bold">Subjects</h1>
        <button
          onClick={() => navigate("/subjects/add")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto hover:bg-green-700 transition-colors duration-200"
        >
          + Add Subject
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search subject by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 p-2.5 rounded-lg w-full mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {filteredSubjects.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg">No subjects found</p>
              <p className="text-gray-400 mt-2">
                {search
                  ? `No subject matches "${search}"`
                  : 'Click "Add Subject" to create a subject'}
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
                      <th className="p-3">Subject Name</th>
                      <th className="p-3">Code</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubjects.map((s, index) => (
                      <tr key={s._id} className="border-t hover:bg-gray-50">
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3 font-semibold">{s.name}</td>
                        <td className="p-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                            {s.code}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => navigate(`/subjects/edit/${s._id}`)}
                              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(s._id)}
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
                {filteredSubjects.map((s, index) => (
                  <div key={s._id} className="bg-white shadow rounded-lg p-4 border">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-gray-500 text-sm">#{index + 1}</span>
                        <h3 className="font-semibold text-lg">{s.name}</h3>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                        {s.code}
                      </span>
                    </div>
                    <div className="flex gap-2 pt-3 border-t">
                      <button
                        onClick={() => navigate(`/subjects/edit/${s._id}`)}
                        className="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s._id)}
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
                Showing {filteredSubjects.length} of {subjects.length} subjects
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default SubjectList;