import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

function AssignTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [teacherId, setTeacherId] = useState("");

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      const res = await api.get("/teachers");
      setTeachers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/classes/${id}/assign-teacher`, {
        teacherId,
      });

      alert("Teacher assigned successfully.");

      navigate("/classes");
    } catch (err) {
      console.log(err);
      alert("Failed to assign teacher.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-6">
        Assign Teacher
      </h1>

      <form onSubmit={handleAssign}>
        <label className="block mb-2 font-medium">
          Select Teacher
        </label>

        <select
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          className="w-full border p-3 rounded"
          required
        >
          <option value="">
            -- Select Teacher --
          </option>

          {teachers.map((teacher) => (
            <option
              key={teacher._id}
              value={teacher._id}
            >
              {teacher.firstName} {teacher.lastName}
            </option>
          ))}
        </select>

        <button
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded"
        >
          Assign Teacher
        </button>
      </form>
    </div>
  );
}

export default AssignTeacher;