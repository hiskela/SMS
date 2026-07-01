import { useState } from "react";

function ClassForm() {
  const [form, setForm] = useState({
    name: "",
    grade: "",
    section: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-4 space-y-3">

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Class Name"
        className="border p-2 w-full"
      />

      <input
        name="grade"
        value={form.grade}
        onChange={handleChange}
        placeholder="Grade"
        className="border p-2 w-full"
      />

      <input
        name="section"
        value={form.section}
        onChange={handleChange}
        placeholder="Section"
        className="border p-2 w-full"
      />

    </div>
  );
}

export default ClassForm;