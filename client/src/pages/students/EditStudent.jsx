import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchStudent = async () => {
    try {
      const res = await api.get(`/students/${id}`);

      setForm({
        firstName: res.data.firstName || "",
        lastName: res.data.lastName || "",
        gender: res.data.gender || "",
        dateOfBirth: res.data.dateOfBirth
          ? res.data.dateOfBirth.substring(0, 10)
          : "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        address: res.data.address || "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to load student.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

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

      await api.put(`/students/${id}`, form);

      alert("Student updated successfully.");

      navigate(`/students/${id}`);
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Failed to update student."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">

      <button
        onClick={() => navigate(`/students/${id}`)}
        className="bg-gray-600 text-white px-4 py-2 rounded mb-5 hover:bg-gray-700"
      >
        ← Back
      </button>

      <div className="bg-white shadow rounded-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Edit Student
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >

          <div>
            <label className="block mb-1 font-medium">
              First Name
            </label>

            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Last Name
            </label>

            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Gender
            </label>

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Date of Birth
            </label>

            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">
              Address
            </label>

            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={4}
              className="border rounded p-2 w-full"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">

            <button
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EditStudent;