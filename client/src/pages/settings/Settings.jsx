import { useEffect, useState } from "react";
import api from "../../api/axios";
import { ClipLoader } from "react-spinners";
import {toast} from "react-toastify"

function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    schoolName: "",
    logo: "",
    address: "",
    email: "",
    phone: "",
    website: "",
    semester: "",
    academicYear: "",
  });

  // Get settings
  const fetchSettings = async () => {
    try {
      const res = await api.get("/settings");

      if (res.data) {
        setForm(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await api.put("/settings", form);

      toast.success("Settings updated successfully");
    } catch (err) {
      console.log(err);

      toast.error("Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading settings...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">School Settings ⚙️</h1>

      {saving && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <ClipLoader size={40} />

            <p className="mt-3">Saving settings...</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 grid gap-4"
      >
        <input
          name="schoolName"
          value={form.schoolName}
          onChange={handleChange}
          placeholder="School Name"
          className="border p-2 rounded"
        />

        <input
          name="logo"
          value={form.logo}
          onChange={handleChange}
          placeholder="Logo URL"
          className="border p-2 rounded"
        />

        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="border p-2 rounded"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 rounded"
        />

        <input
          name="website"
          value={form.website}
          onChange={handleChange}
          placeholder="Website"
          className="border p-2 rounded"
        />

        <select
          name="semester"
          value={form.semester}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Semester</option>

          <option>Semester 1</option>

          <option>Semester 2</option>
        </select>

        <input
          name="academicYear"
          value={form.academicYear}
          onChange={handleChange}
          placeholder="Academic Year"
          className="border p-2 rounded"
        />

        <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Save Settings
        </button>
      </form>
    </div>
  );
}

export default Settings;
