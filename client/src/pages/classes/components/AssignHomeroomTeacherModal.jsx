import { useEffect, useState } from "react";
import api from "../../../api/axios";

function AssignHomeroomTeacherModal({
  open,
  onClose,
  classId,
  refresh,
  hasTeacher,
}) {
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState("");

  useEffect(() => {
    if (!open) return;

    const loadTeachers = async () => {
      try {
        let url = "/classes/teachers/homeroom";

        if (hasTeacher) {
          url += "?mode=all";
        } else {
          url += "?mode=available";
        }

        const res = await api.get(url);

        setTeachers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadTeachers();
  }, [open, hasTeacher]);

  const handleSubmit = async (e) => {
    e.preventDefault();

if(!teacher){
 alert("Please select a teacher");
 return;
}
    try {
      await api.put(`/classes/${classId}/assign-homeroom`, {
        teacherId: teacher,
      });
    alert("Homeroom teacher assigned successfully");

    refresh();
    onClose();

    } catch (err) {
      if (err.response?.status === 409) {
        const confirmReplace = window.confirm(
          `${err.response.data.message}.
Do you want to move this teacher here?`,
        );

        if (confirmReplace) {
          await api.put(`/classes/${classId}/assign-homeroom`, {
            teacherId: teacher,
            confirmReplace: true,
          });

          alert("Teacher assigned successfully");

          refresh();
          onClose();
        }

        return;
      }

      alert("Failed");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="font-bold text-xl mb-4">Assign Homeroom Teacher</h2>

        <form onSubmit={handleSubmit}>
          <select
            className="border p-2 w-full"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
          >
            <option value="">Select Teacher</option>

            {teachers.map((t) => (
              <option key={t._id} value={t._id}>
                {t.firstName} {t.lastName}
              </option>
            ))}
          </select>

          <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded">
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 mt-4 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AssignHomeroomTeacherModal;
