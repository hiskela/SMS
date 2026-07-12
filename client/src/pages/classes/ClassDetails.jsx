import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import AddStudentModal from "./components/AddStudentModal";
import MoveStudentModal from "./components/MoveStudentModal";
import AssignHomeroomTeacherModal from "./components/AssignHomeroomTeacherModal";
function ClassDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
const [subjects,setSubjects]=useState([]);

const fetchSubjects=async()=>{

const res=await api.get(
 `/classes/${id}/subjects`
);

setSubjects(res.data);

};



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

  useEffect(()=>{

fetchClass();
fetchSubjects();

},[id]);

  const removeStudent = async (studentId) => {
    const confirm = window.confirm("Remove this student from the class?");
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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="p-6 text-center text-gray-500">
        Class not found.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <button
            onClick={() => navigate("/classes")}
            className="text-white mb-3 bg-pink-600 px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors duration-200 inline-flex items-center gap-2"
          >
            ← Back
          </button>
          <h1 className="text-2xl md:text-3xl font-bold">{classData.name}</h1>
          <p className="text-gray-500 text-sm md:text-base">
            Grade {classData.grade} • Section {classData.section}
          </p>
        </div>

        <button
          onClick={() => setShowStudentModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto hover:bg-green-700 transition-colors duration-200"
        >
          + Add Student
        </button>
      </div>

      {/* Teacher Section */}
      <div className="bg-white shadow rounded-lg p-4 md:p-5 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              Homeroom Teacher
            </h2>
            {classData.homeroomTeacher ? (
              <>
                <p className="font-medium">
                  {classData.homeroomTeacher.firstName}{" "}
                  {classData.homeroomTeacher.lastName}
                </p>
                <p className="text-gray-500 text-sm">{classData.homeroomTeacher.email}</p>
                <p className="text-gray-500 text-sm">{classData.homeroomTeacher.phone}</p>
              </>
            ) : (
              <p className="text-gray-500">No teacher assigned</p>
            )}
          </div>

          <button
            onClick={() => setShowTeacherModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto"
          >
            {classData.homeroomTeacher ? "Change Teacher" : "Assign Teacher"}
          </button>
        </div>
      </div>
<div className="bg-white shadow rounded-lg p-4 mb-6">

<h2 className="text-xl font-semibold mb-3">
Subjects
</h2>


{
subjects.length===0 ?

<p className="text-gray-500">
No subjects assigned
</p>

:

<div className="flex flex-wrap gap-2">

{
subjects.map(subject=>(

<span
key={subject._id}
className="bg-blue-100 px-3 py-1 rounded"
>
{subject.name}
</span>

))
}

</div>

}

</div>
      {/* Students Section */}
      <div className="bg-white shadow rounded-lg p-4 md:p-5">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          Students ({classData.students.length})
        </h2>

        {classData.students.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No students assigned.</p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-2 text-sm font-semibold">Student ID</th>
                    <th className="text-left p-2 text-sm font-semibold">Name</th>
                    <th className="text-left p-2 text-sm font-semibold">Gender</th>
                    <th className="text-left p-2 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classData.students.map((student) => (
                    <tr key={student._id} className="border-b hover:bg-gray-50">
                      <td className="p-2 text-sm">{student.studentId}</td>
                      <td className="p-2 font-medium">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="p-2 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 
                          student.gender === 'Female' ? 'bg-pink-100 text-pink-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {student.gender}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => {
                              setSelectedStudent(student);
                              setShowMoveModal(true);
                            }}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                          >
                            Move
                          </button>
                          <button
                            onClick={() => removeStudent(student._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {classData.students.map((student) => (
                <div key={student._id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        ID: {student.studentId}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 
                      student.gender === 'Female' ? 'bg-pink-100 text-pink-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {student.gender}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowMoveModal(true);
                      }}
                      className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 text-sm"
                    >
                      Move
                    </button>
                    <button
                      onClick={() => removeStudent(student._id)}
                      className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modals */}
     

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
<AssignHomeroomTeacherModal
 open={showTeacherModal}
 onClose={()=>setShowTeacherModal(false)}
 classId={classData._id}
 refresh={fetchClass}
 hasTeacher={!!classData.homeroomTeacher}

/>
    </div>
  );
}

export default ClassDetails;