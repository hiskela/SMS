import { useEffect, useState } from "react";
import api from "../../../api/axios";
import {toast} from "react-toastify"
function AddStudentModal({
  open,
  onClose,
  classId,
  refresh,
}) {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  if (!open) return;

  const fetchStudents = async () => {
    try {
const res=await api.get(`/classes/${classId}/available-students`); 
    setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchStudents();

}, [open]);

  const handleAssign = async (e) => {
    e.preventDefault();

    if (!studentId) {
      return toast.warning("Please select a student.");
    }

    try {
      setLoading(true);

      await api.post("/classes/assign-student", {
        classId,
        studentId,
      });

      toast.success("Student assigned successfully.");

      refresh();
      onClose();

    } catch (err) {

      // Student already belongs to another class
      if (err.response?.status === 409) {

        const move = window.confirm(
          err.response.data.message +
          "\n\nMove this student to the selected class?"
        );

        if (!move) return;

        await api.put("/classes/move-student", {
          classId,
          studentId,
        });

        toast.success("Student moved successfully.");

        refresh();
        onClose();

      } else {

        toast.error(
          "Failed to assign student."
        );

      }

    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">

        <h2 className="text-2xl font-bold mb-5">
          Add Student
        </h2>

        <form
          onSubmit={handleAssign}
          className="space-y-4"
        >

          <select
            value={studentId}
            onChange={(e) =>
              setStudentId(e.target.value)
            }
            className="border rounded w-full p-2"
          >

            <option value="">
              Select Student
            </option>

            {students.map((student) => (

              <option
                key={student._id}
                value={student._id}
              >
                {student.firstName} {student.lastName}
                {" - "}
                {student.grade}
              </option>

            ))}

          </select>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {loading
                ? "Saving..."
                : "Assign Student"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddStudentModal;