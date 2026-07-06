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
    } catch {
      setError("Failed to load classes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/classes/${id}`);
      fetchClasses();
    } catch {
      alert("Failed to delete class");
    }
  };

  const filteredClasses = classes.filter((cls) =>
    `${cls.name} ${cls.grade} ${cls.section} ${cls.homeroomTeacher?.firstName || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold">Classes</h1>
        <button
          onClick={() => navigate("/classes/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-700 transition-colors"
        >
          + Add Class
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p className="text-center text-gray-500 py-8">Loading classes...</p>
      ) : (
        <>
          {filteredClasses.length > 0 && (
            <input
              type="text"
              placeholder="Search classes..."
              className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}

          {filteredClasses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No classes found</p>
              <p className="text-gray-400 text-sm mt-2">
                Click "Add Class" to create your first class
              </p>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE VIEW */}
              <div className="hidden md:block bg-white shadow rounded overflow-x-auto">
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
                    {filteredClasses.map((cls, i) => (
                      <tr key={cls._id} className="border-t hover:bg-gray-50">
                        <td className="p-3">{i + 1}</td>
                        <td className="p-3">{cls.name}</td>
                        <td className="p-3">{cls.grade}</td>
                        <td className="p-3">{cls.section}</td>
                        <td className="p-3">
                          {cls.homeroomTeacher ? (
                            <span className="text-green-600">
                              {cls.homeroomTeacher.firstName} {cls.homeroomTeacher.lastName}
                            </span>
                          ) : (
                            <span className="text-yellow-600">Not Assigned</span>
                          )}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => navigate(`/classes/edit/${cls._id}`)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => navigate(`/classes/${cls._id}/assign-teacher`)}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors ml-2"
                          >
                            Assign Teacher
                          </button>
<button
onClick={()=>
navigate(`/classes/${cls._id}`)
}
className="bg-purple-600 text-white px-3 py-1 rounded"
>
View
</button>
<button

onClick={()=>
navigate("/classes/assign-student")
}

className="bg-green-800 text-white px-3 py-1 rounded"

>

Assign Student

</button>
                          <button
                            onClick={() => handleDelete(cls._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors ml-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARD VIEW */}
              <div className="md:hidden space-y-4">
                {filteredClasses.map((cls, i) => (
                  <div key={cls._id} className="bg-white shadow rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-gray-500">#{i + 1}</span>
                      <div>
                        <button
                          onClick={() => navigate(`/classes/edit/${cls._id}`)}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => navigate(`/classes/${cls._id}/assign-teacher`)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors ml-1"
                        >
                          Assign Teacher
                        </button>
<button

onClick={()=>
navigate("/classes/assign-student")
}

className="bg-purple-600 text-white px-3 py-1 rounded"

>

Assign Student

</button>
                        <button
                          onClick={() => handleDelete(cls._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors ml-1"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium text-gray-600">Name</span>
                        <span className="text-gray-900">{cls.name}</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium text-gray-600">Grade</span>
                        <span className="text-gray-900">{cls.grade}</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium text-gray-600">Section</span>
                        <span className="text-gray-900">{cls.section}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-600">Teacher</span>
                        {cls.homeroomTeacher ? (
                          <span className="text-green-600">
                            {cls.homeroomTeacher.firstName} {cls.homeroomTeacher.lastName}
                          </span>
                        ) : (
                          <span className="text-yellow-600">Not Assigned</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ClassList;