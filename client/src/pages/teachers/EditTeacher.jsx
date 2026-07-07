import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

function EditTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    qualification: "",
    experience: "",
    address: "",
  });

  useEffect(() => {
    fetchTeacher();
  }, []);

  const fetchTeacher = async () => {
    try {
      const res = await api.get(`/teachers/${id}`);

      setFormData({
        firstName: res.data.firstName || "",
        lastName: res.data.lastName || "",
        gender: res.data.gender || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        qualification: res.data.qualification || "",
        experience: res.data.experience || "",
        address: res.data.address || "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to load teacher.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await api.put(`/teachers/${id}`, formData);

      alert("Teacher updated successfully.");

      navigate(`/teachers/${id}`);
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Failed to update teacher.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(`/teachers/${id}`)}
        className="bg-pink-600 text-white px-3 py-2 rounded mb-5"
      >
        ← Back
      </button>

      <div className="bg-white shadow rounded-lg">
        <div className="bg-green-600 text-white p-5 rounded-t-lg">
          <h2 className="text-2xl font-bold">Edit Teacher</h2>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5 p-6">
          <div>
            <label className="block mb-1 font-medium">First Name</label>

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Last Name</label>

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Gender</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Qualification</label>

            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Experience</label>

            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Address</label>

            <textarea
              rows="4"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
            >
              {saving ? "Updating..." : "Update Teacher"}
            </button>

            <button
              type="button"
              onClick={() => navigate(`/teachers/${id}`)}
              className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTeacher;
