import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
const [search, setSearch]=useState("")
  // Load teachers
  const fetchTeachers = async () => {
    try {
setLoading(true)
      const res = await axios.get("http://localhost:3000/api/teachers");
setLoading(false);
      setTeachers(res.data);
    } catch (err) {
      console.log(err);
setLoading(false)
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
    <div className="p-6">

      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Teachers</h1>

        <button
          onClick={() => navigate("/teachers/add")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Teacher
        </button>
      </div>
   <input
        type="text"
        placeholder="Search student..."
        className="border p-2 w-full mb-4 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* TABLE */}
{loading?        <p>Loading Teachers...</p>:  
      <div className="bg-white shadow rounded ">
        <table className="w-full min-w-[600px]  md:p-6">
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
            {teachers.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No teachers found
                </td>
              </tr>
            ) : (
              filteredTeachers.map((t, i) => (
                <tr key={t} className="border-t">

                  <td className="p-3">{i+1}</td>

                  <td className="p-3">{t.teacherId}</td>
                  <td className="p-3">
                    {t.firstName} {t.lastName}
                  </td>
                  <td className="p-3">{t.gender}</td>
                  <td className="p-3">{t.phone}</td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => deleteTeacher(t._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
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
}
    </div>
  );
}

export default TeacherList;