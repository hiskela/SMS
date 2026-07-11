import { useEffect, useState } from "react";
import api from "../../../api/axios";
import {toast} from "react-toastify"
function MoveStudentModal({
  open,
  onClose,
  student,
  currentClass,
  refresh,
}) {
  const [classes, setClasses] = useState([]);
  const [newClassId, setNewClassId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !student || !currentClass) return;

    const fetchClasses = async () => {
      try {
        const res = await api.get("/classes");
        const otherClasses = res.data.filter(
          (cls) => cls._id !== currentClass?._id
        );
        setClasses(otherClasses);
        setNewClassId("");
      } catch (err) {
toast.error("Error Fetching classes")      }
    };

    fetchClasses();
  }, [open, currentClass, student]);

  const handleMove = async (e) => {
    e.preventDefault();

    if (!newClassId) {
      return toast.warning("Please select a class");
    }

    const selectedClass = classes.find(
      (cls) => cls._id === newClassId
    );

    if (!selectedClass) {
      return toast.warning("Selected class not found");
    }

    const confirmMove = window.confirm(
      `Move ${student.firstName} ${student.lastName} from ${currentClass.name} to ${selectedClass.name}?`
    );

    if (!confirmMove) return;

    try {
      setLoading(true);
      
      
      const response = await api.put(`/classes/${student._id}/move-student`, {
        classId: newClassId
      });
      
      toast.success("Student moved successfully");
      await refresh();
      onClose();
    } catch (err) {
      toast.error( "Failed to move student");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Move Student</h2>
        <p className="mb-4 text-gray-600">
          Student: <strong>{student.firstName} {student.lastName}</strong>
        </p>
        <p className="mb-4">
          Current Class: <span className="font-semibold">{currentClass.name}</span>
        </p>

        <form onSubmit={handleMove} className="space-y-4">
          <select
            value={newClassId}
            onChange={(e) => setNewClassId(e.target.value)}
            className="border rounded p-2 w-full"
            required
          >
            <option value="">Select New Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name} - Grade {cls.grade}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 disabled:opacity-50"
            >
              {loading ? "Moving..." : "Move Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MoveStudentModal;