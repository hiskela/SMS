import { useEffect, useState } from "react";
import axios from "axios";

function ClassList() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/classes")
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteClass = async (id) => {
    await axios.delete(`http://localhost:3000/api/classes/${id}`);
    setClasses(classes.filter((c) => c._id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Classes</h1>

      <table className="w-full bg-white shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Class ID</th>
            <th className="p-2">Grade</th>
            <th className="p-2">Section</th>
            <th className="p-2">Capacity</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {classes.map((c) => (
            <tr key={c._id} className="text-center border-t">
              <td className="p-2">{c.classId}</td>
              <td className="p-2">{c.grade}</td>
              <td className="p-2">{c.section}</td>
              <td className="p-2">{c.capacity}</td>

              <td className="p-2">
                <button
                  onClick={() => deleteClass(c._id)}
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

export default ClassList;