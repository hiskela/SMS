import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

function SubjectList() {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  const loadSubjects = async () => {
    const res = await api.get("/subjects");
    setSubjects(res.data);
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/subjects/${id}`);
    loadSubjects();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Subjects</h2>

      <button
        onClick={() => navigate("/subjects/add")}
        className="bg-green-600 text-white px-3 py-1 mb-4"
      >
        Add Subject
      </button>
          <div className="hidden md:block bg-white shadow rounded overflow-x-auto">

     
  <table className="w-full border">
        <thead className="bg-gray-300">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Code</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((s) => (
            <tr key={s._id}>
              <td className="p-2 border">{s.name}</td>
              <td className="p-2 border">{s.code}</td>

              <td className="p-2 border space-x-2 flex items-center justify-center">
                <button
                  onClick={() => navigate(`/subject/edit/${s._id}`)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(s._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

</div>
    </div>
  );
}

export default SubjectList;