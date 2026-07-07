import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

function TeacherDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTeacher = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/teachers/${id}`);

      setTeacher(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load teacher");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacher();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">Loading teacher...</div>;
  }

  if (!teacher) {
    return <div className="p-6 text-center">Teacher not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <button
        onClick={() => navigate("/teachers")}
        className="bg-pink-600 text-white px-3 py-2 rounded mb-5"
      >
        ← Back
      </button>

      <div className="bg-white shadow rounded-lg">
        <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
          <h1 className="text-2xl font-bold">Teacher Details</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div>
            <p className="text-gray-500 text-sm">First Name</p>

            <p className="font-semibold">{teacher.firstName}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Last Name</p>

            <p className="font-semibold">{teacher.lastName}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Gender</p>

            <p className="font-semibold">{teacher.gender}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>

            <p className="font-semibold break-all">{teacher.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Phone</p>

            <p className="font-semibold">{teacher.phone}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Qualification</p>

            <p className="font-semibold">{teacher.qualification || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Experience</p>

            <p className="font-semibold">{teacher.experience || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Address</p>

            <p className="font-semibold">{teacher.address || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Teacher ID</p>

            <p className="font-semibold">{teacher.teacherId || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Created At</p>

           <p className="font-semibold">
  {teacher.createdAt
    ? new Date(teacher.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A"}
</p>
          </div>
        </div>

        <div className="border-t p-6 flex gap-3">
          <button
            onClick={() => navigate(`/teachers/edit/${teacher._id}`)}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
          >
            Edit Teacher
          </button>

          <button
            onClick={() => navigate("/teachers")}
            className="bg-gray-600 text-white px-5 py-2 rounded hover:bg-gray-700"
          >
            Back to Teachers
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherDetails;
