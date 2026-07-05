import { useEffect, useState } from "react";
import api from "../../api/axios";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  // Load profile
  const loadProfile = async () => {
    try {
      const res = await api.get("/profile/me");
      setProfile(res.data);
    } catch (err) {
      console.log("PROFILE ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Open edit mode
  const handleEdit = () => {
    setForm(profile); // fill form with current data
    setEditing(true);
  };

  // Cancel edit
  const handleCancel = () => {
    setEditing(false);
    setForm({});
  };

  // Save profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put("/profile/me", form);
      await loadProfile(); // refresh updated data
      setEditing(false);
    } catch (err) {
      console.log("UPDATE ERROR:", err.response?.data || err.message);
    }
  };

  if (!profile) return <p className="p-6">Loading...</p>;
console.log("PROFILE:", profile);
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-54">

      {/* LEFT CARD */}
      <div className="bg-white shadow rounded-2xl p-6 text-center w-fit">

        <div className="w-20 h-20 mx-auto bg-blue-600 text-white flex items-center justify-center rounded-full text-2xl font-bold">
          {profile.firstName?.charAt(0) || profile.username?.charAt(0)}
        </div>

        <h2 className="mt-4 text-xl font-bold">
          {profile.firstName} {profile.lastName}
        </h2>

        <p className="text-gray-500 capitalize">{profile.role}</p>

        <div className="mt-4 text-sm text-gray-600 space-y-1">
          <p><strong>ID:</strong> {profile._id}</p>
          <p><strong>Username:</strong> {profile.username}</p>
        </div>

        {!editing ? (
          <button
            onClick={handleEdit}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Update Profile
          </button>
        ) : (
          <button
            onClick={handleCancel}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded w-full"
          >
            Cancel
          </button>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="md:col-span-2 bg-white shadow rounded-2xl p-6 w-fit">

        <h2 className="text-xl font-bold mb-4">
          Profile Details
        </h2>

        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="firstName"
              value={form.firstName || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="First Name"
            />

            <input
              name="lastName"
              value={form.lastName || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Last Name"
            />

            <input
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Email"
            />

            <input
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Phone"
            />

            <input
              name="address"
              value={form.address || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Address"
            />

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              Save Changes
            </button>

          </form>
        ) : (
         <div className="space-y-3 text-gray-700">

  <p>
    <strong>Full Name:</strong>{" "}
    {profile.firstName} {profile.lastName}
  </p>

  <p>
    <strong>Username:</strong> {profile.username}
  </p>

  <p>
    <strong>Email:</strong> {profile.email}
  </p>

  <p>
    <strong>Phone:</strong> {profile.phone}
  </p>

  <p>
    <strong>Address:</strong> {profile.address}
  </p>

  <p>
    <strong>Role:</strong> {profile.role}
  </p>

</div>
        )}
      </div>
    </div>
  );
}

export default Profile;