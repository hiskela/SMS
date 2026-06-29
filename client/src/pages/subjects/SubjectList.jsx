import { useEffect, useState } from "react";
import axios from "axios";

function SubjectList() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/subjects")
      .then((res) => setSubjects(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteSubject = async (id) => {
    await axios.delete(`http://localhost:3000/api/subjects/${id}`);
    setSubjects(subjects.filter((s) => s._id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Subjects</h1>

      <table className="w-full bg-white shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Subject ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Code</th>
            <th className="p-2">Grade</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((s) => (
            <tr key={s._id} className="text-center border-t">
              <td className="p-2">{s.subjectId}</td>
              <td className="p-2">{s.name}</td>
              <td className="p-2">{s.code}</td>
              <td className="p-2">{s.grade}</td>

              <td className="p-2">
                <button
                  onClick={() => deleteSubject(s._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
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

export default SubjectList;