import { useEffect, useState } from "react";
import api from "../../../api/axios"
function AssignTeacherModal({ open, onClose, subject }) {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);

  const [form, setForm] = useState({
    teacher: "",
    class: "",
    academicYear: "2025-2026",
    semester: "1",
  });

  useEffect(() => {
    if (!open) return;

    const loadData = async () => {
      try {
        const teachersRes = await api.get("/teachers");

        const classesRes = await api.get("/classes");

        setTeachers(teachersRes.data);
        setClasses(classesRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, [open]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/teaching-assignments", {
        teacher: form.teacher,
        subject: subject._id,
        class: form.class,
        academicYear: form.academicYear,
        semester: form.semester,
      });

      alert("Teacher assigned successfully");

      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to assign teacher");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          Assign Teacher To {subject.name}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="teacher"
            value={form.teacher}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Teacher</option>

            {teachers.map((t) => (
              <option key={t._id} value={t._id}>
                {t.firstName} {t.lastName}
              </option>
            ))}
          </select>

          <select
            name="class"
            value={form.class}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Class</option>

            {classes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            name="semester"
            value={form.semester}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="1">Semester 1</option>

            <option value="2">Semester 2</option>
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Assign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignTeacherModal;
