import { useEffect, useState } from "react";
import api from "../../../api/axios";
import {toast} from "react-toastify"
function AssignTeacherModal({
  open,
  onClose,
  classId,
  refresh,
}) {
  const [teachers, setTeachers] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    const fetchTeachers = async () => {
      try {
        const res = await api.get("/teachers");
        setTeachers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTeachers();
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teacherId) {
      toast.warning("Please select a teacher.");
      return;
    }

    try {
      setLoading(true);

      await api.put(
        `/classes/${classId}/assign-teacher`,
        {
          teacherId,
        }
      );

      await refresh();

      onClose();
    } catch (err) {
      toast.error(
          "Failed to assign teacher."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">

        <h2 className="text-2xl font-bold mb-5">
          Assign Homeroom Teacher
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <select
            value={teacherId}
            onChange={(e) =>
              setTeacherId(e.target.value)
            }
            className="border rounded w-full p-2"
          >
            <option value="">
              Select Teacher
            </option>

            {teachers.map((teacher) => (
              <option
                key={teacher._id}
                value={teacher._id}
              >
                {teacher.firstName}{" "}
                {teacher.lastName}
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
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {loading
                ? "Saving..."
                : "Assign Teacher"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AssignTeacherModal;