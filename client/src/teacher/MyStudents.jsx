import { useEffect, useState } from "react";
import api from "../api/axios";

function MyStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  const fetchStudents = async () => {
    try {

      const res = await api.get("/classes/my-students");


      setStudents(res.data);

    } catch(err) {

      console.log("Frontend error:", err.response?.data || err.message);

    } finally {
      setLoading(false);
    }
  };

  fetchStudents();

}, []);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold">My Students 👨‍🎓</h1>
      <p className="text-gray-500 mt-2">
        List of students assigned to your classes
      </p>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : students.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center mt-6">
          <p className="text-gray-500 text-lg">No students assigned yet.</p>
          <p className="text-gray-400 text-sm mt-2">
            Students will appear here once they are assigned to your classes.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white shadow rounded-xl overflow-x-auto mt-6">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left text-sm font-semibold">#</th>
                  <th className="p-3 text-left text-sm font-semibold">Student ID</th>
                  <th className="p-3 text-left text-sm font-semibold">Name</th>
                  <th className="p-3 text-left text-sm font-semibold">Gender</th>
                  <th className="p-3 text-left text-sm font-semibold">Email</th>
                  <th className="p-3 text-left text-sm font-semibold">Phone</th>
                  <th className="p-3 text-left text-sm font-semibold">Class</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, index) => (
                  <tr key={s._id || index} className="border-t hover:bg-gray-50">
                    <td className="p-3 text-sm">{index + 1}</td>
                    <td className="p-3 text-sm">{s.studentId || s.admissionNumber}</td>
                    <td className="p-3 font-medium">
                      {s.firstName} {s.lastName}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        s.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 
                        s.gender === 'Female' ? 'bg-pink-100 text-pink-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {s.gender || 'N/A'}
                      </span>
                    </td>
                    <td className="p-3 text-sm">{s.email || 'N/A'}</td>
                    <td className="p-3 text-sm">{s.phone || 'N/A'}</td>
                    <td className="p-3 text-sm">
                      {s.class?.name || s.assignedClass?.name || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 mt-6">
            {students.map((s, index) => (
              <div key={s._id || index} className="bg-white shadow rounded-lg p-4 border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-gray-500 text-sm">#{index + 1}</span>
                    <p className="font-semibold text-base">
                      {s.firstName} {s.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      ID: {s.studentId || s.admissionNumber}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    s.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 
                    s.gender === 'Female' ? 'bg-pink-100 text-pink-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {s.gender || 'N/A'}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>📧 {s.email || 'N/A'}</p>
                  <p>📱 {s.phone || 'N/A'}</p>
                  <p>🏫 Class: {s.class?.name || s.assignedClass?.name || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Results Counter */}
          <div className="mt-4 text-sm text-gray-500 text-center">
            Showing {students.length} student{students.length > 1 ? 's' : ''}
          </div>
        </>
      )}
    </div>
  );
}

export default MyStudents;