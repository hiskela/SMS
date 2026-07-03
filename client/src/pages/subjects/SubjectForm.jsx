import { useEffect, useState } from "react";

function SubjectForm({ initialData = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    name: "",
    code: "",
  });

  useEffect(() => {
    if (initialData && initialData._id) {
      setForm({
        name: initialData.name || "",
        code: initialData.code || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();



    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Subject Name"
        className="border p-2 w-full"
      />

      <input
        name="code"
        value={form.code}
        onChange={handleChange}
        placeholder="Subject Code"
        className="border p-2 w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Subject
      </button>
    </form>
  );
}

export default SubjectForm;