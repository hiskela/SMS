import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

import AssignTeacherModal from "./components/AddTeacherModal";
import AddStudentModal from "./components/AddStudentModal";
import MoveStudentModal from "./components/MoveStudentModal";

function ClassDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchClass = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/classes/${id}/details`);

      setClassData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClass();
  }, [id]);

  const removeStudent = async (studentId) => {
    const confirm = window.confirm(
      "Remove this student from the class?"
    );

    if (!confirm) return;

    try {
      await api.post("/classes/remove-student", {
        classId: classData._id,
        studentId,
      });

      fetchClass();
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="p-6">
        Class not found.
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <button
            onClick={() => navigate("/classes")}
            className="text-blue-600 mb-2"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold">
            {classData.name}
          </h1>

          <p className="text-gray-500">
            Grade {classData.grade} • Section {classData.section}
          </p>
        </div>

        <button
          onClick={() => setShowStudentModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Student
        </button>

      </div>

      {/* Teacher */}

      <div className="bg-white shadow rounded p-5 mb-6">

        <div className="flex justify-between">

          <div>

            <h2 className="text-xl font-semibold mb-2">
              Homeroom Teacher
            </h2>

            {classData.homeroomTeacher ? (
              <>
                <p>
                  {classData.homeroomTeacher.firstName}{" "}
                  {classData.homeroomTeacher.lastName}
                </p>

                <p className="text-gray-500">
                  {classData.homeroomTeacher.email}
                </p>

                <p className="text-gray-500">
                  {classData.homeroomTeacher.phone}
                </p>
              </>
            ) : (
              <p className="text-gray-500">
                No teacher assigned
              </p>
            )}

          </div>

          <button
            onClick={() => setShowTeacherModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded h-fit"
          >
            {classData.homeroomTeacher
              ? "Change Teacher"
              : "Assign Teacher"}
          </button>

        </div>

      </div>

      {/* Students */}

      <div className="bg-white shadow rounded p-5">

        <h2 className="text-xl font-semibold mb-4">
          Students ({classData.students.length})
        </h2>

        {classData.students.length === 0 ? (
          <p>No students assigned.</p>
        ) : (
          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left p-2">Admission No</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Gender</th>
                <th className="text-left p-2">Actions</th>

              </tr>

            </thead>

            <tbody>

              {classData.students.map((student) => (

                <tr
                  key={student._id}
                  className="border-b"
                >

                  <td className="p-2">
                    {student.admissionNumber}
                  </td>

                  <td className="p-2">
                    {student.firstName} {student.lastName}
                  </td>

                  <td className="p-2">
                    {student.gender}
                  </td>

                  <td className="p-2 space-x-2">

                    <button
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowMoveModal(true);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Move
                    </button>

                    <button
                      onClick={() =>
                        removeStudent(student._id)
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Remove
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}

      </div>

      <AssignTeacherModal
        open={showTeacherModal}
        onClose={() => setShowTeacherModal(false)}
        classId={classData._id}
        refresh={fetchClass}
      />

      <AddStudentModal
        open={showStudentModal}
        onClose={() => setShowStudentModal(false)}
        classId={classData._id}
        refresh={fetchClass}
      />

      <MoveStudentModal
        open={showMoveModal}
        onClose={() => setShowMoveModal(false)}
        student={selectedStudent}
        currentClass={classData}
        refresh={fetchClass}
      />

    </div>
  );
}

export default ClassDetails;