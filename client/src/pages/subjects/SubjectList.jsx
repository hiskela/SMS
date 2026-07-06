import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

function SubjectList() {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadSubjects = async () => {
    try {
      const res = await api.get("/subjects");
      setSubjects(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      try {
        await api.delete(`/subjects/${id}`);
        loadSubjects();
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Filter subjects based on search
  const filteredSubjects = subjects.filter((s) =>
    `${s.name} ${s.code}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-2xl font-bold">Subjects</h2>

        <button
          onClick={() => navigate("/subjects/add")}
          className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-green-700 transition-colors"
        >
          + Add Subject
        </button>
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <p className="text-center text-gray-500 py-8">Loading Subjects...</p>
      ) : (
        <>
          {/* Only show search and table if subjects exist */}
          {filteredSubjects.length > 0 ? (
            <>
              {/* SEARCH */}
              <input
                type="text"
                placeholder="Search subject by name or code..."
                className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {/* DESKTOP TABLE VIEW - Hidden on mobile */}
              <div className="hidden md:block bg-white shadow rounded overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200 text-left">
                      <th className="p-3">#</th>
                      <th className="p-3">Subject Name</th>
                      <th className="p-3">Code</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubjects.map((s, i) => (
                      <tr key={s._id} className="border-t hover:bg-gray-50">
                        <td className="p-3">{i + 1}</td>
                        <td className="p-3 font-medium">{s.name}</td>
                        <td className="p-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                            {s.code}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => navigate(`/subject/edit/${s._id}`)}
                              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(s._id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-sm"
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

              {/* MOBILE CARD VIEW - Visible only on mobile */}
              <div className="md:hidden space-y-4">
                {filteredSubjects.map((s, i) => (
                  <div
                    key={s._id}
                    className="bg-white shadow rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-gray-500">#{i + 1}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/subject/edit/${s._id}`)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(s._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium text-gray-600">Subject Name</span>
                        <span className="text-gray-900 font-medium">{s.name}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-600">Code</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {s.code}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            // Show this when no subjects found
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No subjects found</p>
              <p className="text-gray-400 text-sm mt-2">
                Click "Add Subject" to create your first subject
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SubjectList;