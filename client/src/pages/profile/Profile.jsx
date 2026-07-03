import { useEffect, useState } from "react";
import api from "../../../../server/services/api";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("/profile/me");
      setProfile(res.data);
      setForm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put("/profile/me", form);
      setEditing(false);
      loadProfile();
    } catch (err) {
      console.log(err);
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">      <div className="bg-white shadow rounded-xl p-6 text-center">

        <div className="w-24 h-24 mx-auto bg-blue-500 text-white flex items-center justify-center rounded-full text-3xl">
          {profile.username?.charAt(0).toUpperCase()}
        </div>

        <h2 className="mt-4 text-xl font-bold">
          {profile.username}
        </h2>

        <p className="text-gray-500 capitalize">
          {profile.role}
        </p>

        <div className="mt-4 text-sm text-gray-600 space-y-2">
          <p><strong>ID:</strong> {profile._id}</p>
          <p><strong>Role:</strong> {profile.role}</p>
        </div>

        <button
          onClick={() => setEditing(!editing)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {editing ? "Cancel Edit" : "Update Profile"}
        </button>

      </div>      <div className="md:col-span-2 bg-white shadow rounded-xl p-6">

        <h2 className="text-xl font-bold mb-4">
          Profile Details
        </h2>        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="username"
              value={form.username || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Username"
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

            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Save Changes
            </button>

          </form>        ) : (
          <div className="space-y-3 text-gray-700">

            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>

            {profile.student && (
              <>
                <p><strong>Student Name:</strong> {profile.student.name}</p>
                <p><strong>Grade:</strong> {profile.student.grade}</p>
              </>
            )}

            {profile.teacher && (
              <>
                <p><strong>Teacher Name:</strong> {profile.teacher.name}</p>
              </>
            )}

          </div>
        )}      </div>
    </div>
  );
}

export default Profile;