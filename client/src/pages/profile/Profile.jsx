import { useEffect, useState } from "react";
import api from "../../api/axios";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: ""
  });
  const [passwordMessage, setPasswordMessage] = useState("");

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/profile/change-password", passwordForm);
      setPasswordMessage(res.data.message);
      setPasswordForm({
        currentPassword: "",
        newPassword: ""
      });
    } catch (err) {
      setPasswordMessage(
        err.response?.data?.message || "Error changing password"
      );
    }
  };

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setForm({
      firstName: profile.firstName,
      lastName: profile.lastName,
      username: profile.username,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      password: ""
    });
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setForm({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/profile/me", form);
      await loadProfile();
      setEditing(false);
    } catch (err) {
      console.log("UPDATE ERROR:", err.response?.data || err.message);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await api.put("/profile/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Avatar updated successfully");
      loadProfile(); // Reload profile
    } catch (err) {
      console.log(err);
      alert("Failed to update avatar");
    }
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Profile and Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PROFILE CARD */}
        <div className="bg-white shadow rounded-2xl p-6 text-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-gray-300">
              {profile.avatar ? (
                <img
                  src={profile.avatar.startsWith('http') ? profile.avatar : `http://localhost:3000${profile.avatar}`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
                  {profile.firstName?.charAt(0) || profile.username?.charAt(0)}
                </div>
              )}
            </div>

            <label className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>

          <h2 className="mt-4 text-xl font-bold">
            {profile.firstName} {profile.lastName}
          </h2>

          <p className="text-gray-500 capitalize">
            {profile.role}
          </p>

          <div className="mt-4 text-sm text-gray-600 space-y-2">
            <p>
              <strong>ID:</strong> {profile._id}
            </p>
            <p>
              <strong>Username:</strong> {profile.username}
            </p>
          </div>

          <button
            onClick={editing ? handleCancel : handleEdit}
            className={`mt-5 px-4 py-2 rounded w-full text-white transition-colors duration-200 ${
              editing ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editing ? "Cancel" : "Update Profile"}
          </button>
        </div>

        {/* DETAILS CARD */}
        <div className="md:col-span-2 bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-5">Profile Details</h2>

          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="firstName"
                value={form.firstName || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="First Name"
                required
              />

              <input
                name="lastName"
                value={form.lastName || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Last Name"
                required
              />

              <input
                name="username"
                value={form.username || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Username"
                required
              />

              <input
                name="email"
                value={form.email || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Email"
                type="email"
              />

              <input
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Phone"
              />

              <input
                name="address"
                value={form.address || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Address"
              />

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2.5 rounded-lg w-full hover:bg-green-700 transition-colors duration-200"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-3 text-gray-700">
              <p className="flex flex-col sm:flex-row sm:justify-between py-2 border-b">
                <strong>Full Name:</strong>
                <span className="sm:text-right">
                  {profile.firstName} {profile.lastName}
                </span>
              </p>
              <p className="flex flex-col sm:flex-row sm:justify-between py-2 border-b">
                <strong>Username:</strong>
                <span className="sm:text-right">{profile.username}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:justify-between py-2 border-b">
                <strong>Email:</strong>
                <span className="sm:text-right break-all">{profile.email}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:justify-between py-2 border-b">
                <strong>Phone:</strong>
                <span className="sm:text-right">{profile.phone}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:justify-between py-2 border-b">
                <strong>Address:</strong>
                <span className="sm:text-right">{profile.address}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:justify-between py-2">
                <strong>Role:</strong>
                <span className="sm:text-right capitalize">{profile.role}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* PASSWORD SECTION */}
      <div className="bg-white shadow rounded-2xl p-6 max-w-2xl">
        <h2 className="text-xl font-bold mb-4">🔒 Change Password</h2>

        <form onSubmit={changePassword} className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            value={passwordForm.currentPassword}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                currentPassword: e.target.value,
              })
            }
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />

          <input
            type="password"
            placeholder="New Password"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                newPassword: e.target.value,
              })
            }
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            minLength="6"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg w-full sm:w-auto hover:bg-blue-700 transition-colors duration-200"
          >
            Change Password
          </button>
        </form>

        {passwordMessage && (
          <p
            className={`mt-3 p-3 rounded-lg ${
              passwordMessage.toLowerCase().includes("success")
                ? "bg-green-50 text-green-600 border border-green-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}
          >
            {passwordMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default Profile;