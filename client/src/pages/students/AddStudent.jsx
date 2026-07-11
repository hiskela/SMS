import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {toast} from "react-toastify"
function AddStudent() {
  const navigate = useNavigate();
const [saving, setSaving]=useState(false)

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    grade: "",
    phone: "",
email:"",
    address: "",
    familyPhone: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // ✅ VALIDATION (your original logic improved slightly)
  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!form.age || form.age <= 0)
      newErrors.age = "Valid age is required";

    if (!form.gender) newErrors.gender = "Gender is required";

    if (!form.grade) newErrors.grade = "Grade is required";

   if (!/^\d{10}$/.test(form.phone))
  newErrors.phone = "Phone must be in example format  ";

    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.email.trim()) newErrors.email = "Email is required";

   
if (!/^\d{10}$/.test(form.familyPhone))
  newErrors.familyPhone = "Family phone must be in example format ";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
setSaving(true)
    const res = await axios.post(
      "http://localhost:3000/api/students/add",
      form
    );

    toast.success(
      `Student Registered Successfully!

Username: ${res.data.credentials.username}

Temporary Password: ${res.data.credentials.password}`
    );

    navigate("/students");

  } catch (err) {
    console.error(err);
  toast.error(err.response?.data?.message || "Error adding student");
  }
finally{
setSaving(false)
}
};
  return (
    <div className="p-6">
  <button
            onClick={() => navigate("/students")}
            className="text-white mb-2 bg-pink-600 p-1 rounded"
          >
            ← Back
          </button>
      <h1 className="text-2xl font-bold mb-4">Add Student</h1>
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

        <div>
          <input
            name="age"
            type="number"
            placeholder="Age"
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age}</p>
          )}
        </div>

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

        <div>
          <select
            name="grade"
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">Select Grade</option>
            <option>Grade 9</option>
            <option>Grade 10</option>
            <option>Grade 11</option>
            <option>Grade 12</option>
          </select>
          {errors.grade && (
            <p className="text-red-500 text-sm">{errors.grade}</p>
          )}
        </div>

        <div>
          <input
            name="phone"
  placeholder="e.g. 0912345678"
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
 <div>
          <input
            name="email"
  placeholder="e.g. example@gmail.com"
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div>
          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        <div>
          <input
            name="familyPhone"
  placeholder="e.g. 0900000000"
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {errors.familyPhone && (
            <p className="text-red-500 text-sm">{errors.familyPhone}</p>
          )}
        </div>

        <button className="bg-blue-600 text-white p-2 rounded disabled:bg-gray-400">
Save Student
        </button>
      </form>
    </div>
  );
}

export default AddStudent;