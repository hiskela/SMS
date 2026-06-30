import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // FETCH STUDENTS
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/students");
      setStudents(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // DELETE STUDENT
  const deleteStudent = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/api/students/${id}`);
      setStudents(students.filter((s) => s._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // FILTER SEARCH
  const filteredStudents = students.filter((s) =>
    `${s.firstName} ${s.lastName} ${s.admissionNumber}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-2">
        <h2 className="text-2xl font-bold">Student List</h2>
        <button
          onClick={() => navigate("/students/add")}
          className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-green-700 transition-colors"
        >
          + Add New Student
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search student by name or ID..."
        className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LOADING */}
      {loading ? (
        <p className="text-center text-gray-500 py-8">Loading students...</p>
      ) : (
        <>
          {/* DESKTOP TABLE VIEW - Hidden on mobile */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border border-gray-200">#</th>
                  <th className="p-2 border border-gray-200">Student ID</th>
                  <th className="p-2 border border-gray-200">Name</th>
                  <th className="p-2 border border-gray-200">Age</th>
                  <th className="p-2 border border-gray-200">Gender</th>
                  <th className="p-2 border border-gray-200">Grade</th>
                  <th className="p-2 border border-gray-200">Phone</th>
                  <th className="p-2 border border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-4 text-center text-gray-500">
                      No students found
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student, i) => (
                    <tr key={student._id} className="text-center hover:bg-gray-50">
                      <td className="p-2 border border-gray-200">{i + 1}</td>
                      <td className="p-2 border border-gray-200">{student.studentId}</td>
                      <td className="p-2 border border-gray-200">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="p-2 border border-gray-200">{student.age}</td>
                      <td className="p-2 border border-gray-200">{student.gender}</td>
                      <td className="p-2 border border-gray-200">{student.grade}</td>
                      <td className="p-2 border border-gray-200">{student.phone}</td>
                      <td className="p-2 border border-gray-200">
                        <div className="flex gap-2 justify-center">
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                            onClick={() => deleteStudent(student._id)}
                          >
                            Delete
                          </button>
                          <button 
                            onClick={() => navigate(`/students/${student._id}`)}
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD VIEW - Visible only on mobile */}
          <div className="md:hidden space-y-4">
            {filteredStudents.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No students found</p>
            ) : (
              filteredStudents.map((student, i) => (
                <div
                  key={student._id}
                  className="bg-white shadow rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm text-gray-500">#{i + 1}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/students/${student._id}`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => deleteStudent(student._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="font-medium text-gray-600">Student ID</span>
                      <span className="text-gray-900 font-mono text-sm">
                        {student.studentId}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="font-medium text-gray-600">Name</span>
                      <span className="text-gray-900 font-medium">
                        {student.firstName} {student.lastName}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="font-medium text-gray-600">Age</span>
                      <span className="text-gray-900">{student.age}</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="font-medium text-gray-600">Gender</span>
                      <span className="text-gray-900">{student.gender}</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="font-medium text-gray-600">Grade</span>
                      <span className="text-gray-900">{student.grade}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-600">Phone</span>
                      <span className="text-gray-900">{student.phone}</span>
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

export default StudentList;