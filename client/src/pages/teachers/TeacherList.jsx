import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Load teachers
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/teachers");
      setLoading(false);
      setTeachers(res.data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const filteredTeachers = teachers.filter((t) =>
    `${t.firstName} ${t.lastName} ${t.admissionNumber}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Delete teacher
  const deleteTeacher = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/teachers/${id}`);
      setTeachers(teachers.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 md:p-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold">Teachers</h1>

        <button
          onClick={() => navigate("/teachers/add")}
          className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-green-700 transition-colors"
        >
          + Add Teacher
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search teacher by name or ID..."
        className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LOADING STATE */}
      {loading ? (
        <p className="text-center text-gray-500 py-8">Loading Teachers...</p>
      ) : (
        <>
          {/* DESKTOP TABLE VIEW - Hidden on mobile */}
          <div className="hidden md:block bg-white shadow rounded overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">#</th>
                  <th className="p-3">Teacher ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Gender</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No teachers found
                    </td>
                  </tr>
                ) : (
                  filteredTeachers.map((t, i) => (
                    <tr key={t._id} className="border-t hover:bg-gray-50">
                      <td className="p-3">{i + 1}</td>
                      <td className="p-3">{t.teacherId}</td>
                      <td className="p-3">
                        {t.firstName} {t.lastName}
                      </td>
                      <td className="p-3">{t.gender}</td>
                      <td className="p-3">{t.phone}</td>
                      <td className="p-3">
                        <button
                          onClick={() => deleteTeacher(t._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD VIEW - Visible only on mobile */}
          <div className="md:hidden space-y-4">
            {filteredTeachers.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No teachers found</p>
            ) : (
              filteredTeachers.map((t, i) => (
                <div
                  key={t._id}
                  className="bg-white shadow rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-gray-500">#{i + 1}</span>
                    <button
                      onClick={() => deleteTeacher(t._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium text-gray-600">Teacher ID</span>
                      <span className="text-gray-900">{t.teacherId}</span>
                    </div>

                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium text-gray-600">Name</span>
                      <span className="text-gray-900">
                        {t.firstName} {t.lastName}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium text-gray-600">Gender</span>
                      <span className="text-gray-900">{t.gender}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-600">Phone</span>
                      <span className="text-gray-900">{t.phone}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default TeacherList;