import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import {toast} from "react-toastify"

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStudent = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/students/${id}`);

      setStudent(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load student");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-center text-gray-500">
          Loading student...
        </p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-6">
        <p className="text-center text-red-500">
          Student not found.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">

      <button
        onClick={() => navigate("/students")}
        className="bg-gray-600 text-white px-4 py-2 rounded mb-5 hover:bg-gray-700"
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow">

        <div className="border-b p-5 flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            Student Details
          </h1>

          <button
            onClick={() =>
              navigate(`/students/edit/${student._id}`)
            }
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Student
          </button>

        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">

          <div>
            <p className="text-gray-500 text-sm">
              First Name
            </p>

            <p className="font-semibold">
              {student.firstName}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Last Name
            </p>

            <p className="font-semibold">
              {student.lastName}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Gender
            </p>

            <p className="font-semibold">
              {student.gender}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
           Registered
            </p>

          <p className="font-semibold">
  {student.createdAt
    ? new Date(student.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A"}
</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Email
            </p>

            <p className="font-semibold">
              {student.email}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Phone
            </p>

            <p className="font-semibold">
              {student.phone}
            </p>
          </div>
 <div>
            <p className="text-gray-500 text-sm">
              Class
            </p>

            <p className="font-semibold">
            {student.assignedClass
  ? `${student.assignedClass.name} `
  : "Not Assigned"}
            </p>
          </div>
  <div>
            <p className="text-gray-500 text-sm">
              Father Teacher
            </p>

            <p className="font-semibold">
{student.assignedClass?.homeroomTeacher
 ? `${student.assignedClass.homeroomTeacher.firstName} ${student.assignedClass.homeroomTeacher.lastName}`
 : "No teacher assigned"}            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">
              Address
            </p>

            <p className="font-semibold">
              {student.address}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Student ID
            </p>

            <p className="font-semibold">
              {student.studentId}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default StudentDetails;