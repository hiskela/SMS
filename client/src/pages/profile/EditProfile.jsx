import { useState } from "react";
import { updateProfile } from "../../../../server/services/profileService";

function EditProfile({ user }) {
  const [form, setForm] = useState(user);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(form);

      alert("Profile updated successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        type="text"
        name="firstName"
        value={form.firstName || ""}
        onChange={handleChange}
        placeholder="First Name"
        className="border p-2 w-full"
      />

      <input
        type="text"
        name="lastName"
        value={form.lastName || ""}
        onChange={handleChange}
        placeholder="Last Name"
        className="border p-2 w-full"
      />

      <input
        type="email"
        name="email"
        value={form.email || ""}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 w-full"
      />

      <input
        type="text"
        name="phone"
        value={form.phone || ""}
        onChange={handleChange}
        placeholder="Phone"
        className="border p-2 w-full"
      />

      <input
        type="text"
        name="address"
        value={form.address || ""}
        onChange={handleChange}
        placeholder="Address"
        className="border p-2 w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update Profile
      </button>

    </form>
  );
}

export default EditProfile;