import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function ClassForm({
  initialData = {},
  onSubmit,
  loading = false,
}) {
  const [form, setForm] = useState({
    name: "",
    grade: "",
    section: "",
  });
const naviate=useNavigate();
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm({
        name: initialData.name || "",
        grade: initialData.grade || "",
        section: initialData.section || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
if(!form.name||!form.grade||!form.section) return;
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="space-y-4 bg-white p-6 rounded shadow"
    >
      <input
        type="text"
        name="name"
        placeholder="Class Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded p-2"
required
      />

      <input
        type="text"
        name="grade"
        placeholder="Grade"
        value={form.grade}
        onChange={handleChange}
        className="w-full border rounded p-2"
required
      />

      <input
        type="text"
        name="section"
        placeholder="Section"
        value={form.section}
        onChange={handleChange}
        className="w-full border rounded p-2"
required
      />

      {/* ✅ Save Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-black px-5 py-2 rounded"
      >
        {loading ? "Saving..." : "Save Class"}
      </button>
    </form>
  );
}

export default ClassForm;