import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {ClipLoader} from "react-spinners"
function AddTeacher() {
  const navigate = useNavigate();
const [saving, setSaving]=useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
    subjects: "",
    classes: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // ✅ VALIDATION
  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim())
      newErrors.firstName = "First name is required";

    if (!form.lastName.trim())
      newErrors.lastName = "Last name is required";

    if (!form.gender)
      newErrors.gender = "Gender is required";

    if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits";

   if (!form.email.trim()) {
  newErrors.email = "Email is required";
} else if (!/\S+@\S+\.\S+/.test(form.email)) {
  newErrors.email = "Invalid email";
}
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
setSaving(true)
    const res = await axios.post(
      "http://localhost:3000/api/teachers/add",
      {
        ...form,
        subjects: form.subjects
          ? form.subjects.split(",").map(s => s.trim())
          : [],
        classes: form.classes
          ? form.classes.split(",").map(c => c.trim())
          : []
      }
    );

    alert(`Teacher Added Successfully!

Username: ${res.data.credentials.username}
Password: ${res.data.credentials.password}`);

    navigate("/teachers");

  } catch (err) {
    console.log(err);
    alert("Error adding teacher");
  }
finally{
setSaving(false)
}
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Teacher</h1>
{saving && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
      <ClipLoader size={45} color="#2563eb" />
      <p className="mt-4 text-lg font-semibold">
        Registering student...
      </p>
    </div>
  </div>
)}
      <form onSubmit={handleSubmit} className="grid gap-3 max-w-lg">

        {/* FIRST NAME */}
        <div>
          <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          )}
        </div>

        {/* LAST NAME */}
        <div>
          <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName}</p>
          )}
        </div>

        {/* GENDER */}
        <div>
          <select
            name="gender"
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender}</p>
          )}
        </div>

        {/* PHONE */}
        <div>
          <input
            name="phone"
            placeholder="Phone (10 digits)"
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <input
            name="email"
            placeholder="Email (optional)"
            onChange={handleChange}
            className="border p-2 w-full"
required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* SUBJECTS */}
        <div>
          <input
            name="subjects"
            placeholder="Subjects (Math, English, Physics)"
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        {/* CLASSES */}
        <div>
          <input
            name="classes"
            placeholder="Classes (9A, 10B, 11C)"
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        {/* SUBMIT */}
        <button disabled={saving} className="bg-blue-600 text-white p-2 rounded-2xl disabled:bg-gray-400" >
      Save Teacher
        </button>

      </form>
    </div>
  );
}

export default AddTeacher;