import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
const navigate=useNavigate();
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
    <div className="p-6">
     <div className="flex justify-between py-2"> <h2 className="text-2xl font-bold mb-4">Student List</h2>
 <button
          onClick={() => navigate("/students/add")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add New Student
        </button></div>
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search student..."
        className="border p-2 w-full mb-4 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

       
      {/* LOADING */}
      {loading ? (
        <p>Loading students...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">#</th>

                <th className="p-2 border">Student ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Age</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Grade</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student, i) => (
                <tr key={student._id} className="text-center">
                  <td className="p-2 border">{i+1}</td>

                  <td className="p-2 border">{student.studentId}</td>
                  <td className="p-2 border">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="p-2 border">{student.age}</td>
                  <td className="p-2 border">{student.gender}</td>
                  <td className="p-2 border">{student.grade}</td>
                  <td className="p-2 border">{student.phone}</td>

                  <td className="p-2  flex gap-2 justify-center">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                      onClick={() => deleteStudent(student._id)}
                    >
                      Delete
                    </button>

                    <button className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredStudents.length === 0 && (
            <p className="text-center mt-4">No students found</p>
          )}
        </div>
      )}

    </div>
  );
}

export default StudentList;