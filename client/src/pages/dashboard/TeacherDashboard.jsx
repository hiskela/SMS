import { useEffect, useState } from "react";
import api from "../../api/axios";

function TeacherDashboard() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/classes/my-classes");

        if (res.data && Array.isArray(res.data)) {
          setClasses(res.data);
        } else {
          setClasses([]);
        }
      } catch (err) {
        console.error("Error fetching classes:", err);
        setError(err.response?.data?.message || "Failed to load classes");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await api.get("/teaching-assignments/my-assignments");

        setAssignments(res.data);
      } catch (err) {
        console.log("Assignment error:", err);
      }
    };

    fetchAssignments();
  }, []);
  const uniqueSubjects = [
    ...new Map(
      assignments.map((item) => [item.subject?._id, item.subject]),
    ).values(),
  ];
  // Get all unique students from all classes
  const allStudents = classes.flatMap((cls) => cls.students || []);

  // Remove duplicate students
  const uniqueStudents = [
    ...new Map(allStudents.map((student) => [student._id, student])).values(),
  ];

  const femaleStudents = uniqueStudents.filter(
    (student) => student.gender === "Female",
  ).length;

  const handleViewStudents = (cls) => {
    setSelectedClass(cls);
    setShowStudents(true);
  };

  const handleBack = () => {
    setShowStudents(false);
    setSelectedClass(null);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <h1 className="text-2xl md:text-3xl font-bold">Welcome Back 👋</h1>
      <p className="text-gray-500 mt-2">
        Here's an overview of your classes and students.
      </p>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-md border-t-4 border-blue-700 p-6">
          <h2 className="text-gray-500">📚 My Classes</h2>
          <p className="text-3xl md:text-4xl font-bold mt-2">
            {loading ? "..." : classes.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md border-t-4 border-green-400 p-6">
          <h2 className="text-gray-500">👨‍🎓 My Students</h2>
          <p className="text-3xl md:text-4xl font-bold mt-2">
            {loading ? "..." : uniqueStudents.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md border-t-4 border-pink-900 p-6">
          <h2 className="text-gray-500">👧 Female Students</h2>
          <p className="text-3xl md:text-4xl font-bold mt-2">
            {loading ? "..." : femaleStudents}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md border-t-4 border-purple-600 p-6">
          <h2 className="text-gray-500">📖 My Subjects</h2>

          <p className="text-3xl md:text-4xl font-bold mt-2">
            {uniqueSubjects.length}
          </p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            My Students
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            Attendance
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            Grades
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">My Teaching Assignments</h2>

        {assignments.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">No subjects assigned yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {assignments.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow p-5">
                <h3 className="text-xl font-bold text-blue-700">
                  {item.subject?.name}
                </h3>

                <div className="mt-3 text-gray-600">
                  <p>
                    <strong>Class:</strong> {item.class?.name}
                  </p>

                  <p>
                    <strong>Grade:</strong> {item.class?.grade}
                  </p>

                  <p>
                    <strong>Semester:</strong> {item.semester}
                  </p>

                  <p>
                    <strong>Year:</strong> {item.academicYear}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MY CLASSES OR STUDENTS LIST */}
      <div className="mt-8">
        {showStudents && selectedClass ? (
          // Show Students List
          <div>
            <button
              onClick={handleBack}
              className="text-white mb-4 bg-pink-600 px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors duration-200 inline-flex items-center gap-2"
            >
              ← Back to Classes
            </button>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-blue-700 mb-2">
                {selectedClass.name}
              </h2>
              <p className="text-gray-500 mb-4">
                Grade {selectedClass.grade} • Section {selectedClass.section}
              </p>

              <h3 className="text-lg font-semibold mb-4">
                Students ({selectedClass.students?.length || 0})
              </h3>

              {selectedClass.students?.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No students assigned to this class
                </p>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-200 text-left">
                          <th className="p-3">#</th>
                          <th className="p-3">Admission No</th>
                          <th className="p-3">Name</th>
                          <th className="p-3">Gender</th>
                          <th className="p-3">Email</th>
                          <th className="p-3">Phone</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedClass.students.map((student, index) => (
                          <tr
                            key={student._id}
                            className="border-t hover:bg-gray-50"
                          >
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3">
                              {student.studentId || student.admissionNumber}
                            </td>
                            <td className="p-3 font-medium">
                              {student.firstName} {student.lastName}
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  student.gender === "Male"
                                    ? "bg-blue-100 text-blue-800"
                                    : student.gender === "Female"
                                      ? "bg-pink-100 text-pink-800"
                                      : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {student.gender}
                              </span>
                            </td>
                            <td className="p-3">{student.email}</td>
                            <td className="p-3">{student.phone}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden space-y-4">
                    {selectedClass.students.map((student, index) => (
                      <div
                        key={student._id}
                        className="border rounded-lg p-4 bg-gray-50"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-gray-500 text-sm">
                              #{index + 1}
                            </span>
                            <p className="font-semibold">
                              {student.firstName} {student.lastName}
                            </p>
                            <p className="text-sm text-gray-500">
                              ID: {student.studentId || student.admissionNumber}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              student.gender === "Male"
                                ? "bg-blue-100 text-blue-800"
                                : student.gender === "Female"
                                  ? "bg-pink-100 text-pink-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {student.gender}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>📧 {student.email}</p>
                          <p>📱 {student.phone}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          // Show Classes Grid
          <>
            <h2 className="text-2xl font-semibold mb-4">My Classes</h2>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : classes.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold">No Classes Assigned</h3>
                <p className="text-gray-500 mt-2">
                  Please contact the administrator to assign classes.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((cls) => (
                  <div
                    key={cls._id}
                    className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
                  >
                    <h3 className="text-xl font-bold text-blue-700">
                      {cls.name}
                    </h3>
                    <div className="mt-4 space-y-2 text-gray-700">
                      <p>
                        <strong>Grade:</strong> {cls.grade}
                      </p>
                      <p>
                        <strong>Section:</strong> {cls.section}
                      </p>
                      <p>
                        <strong>Students:</strong> {cls.students?.length || 0}
                      </p>
                    </div>
                    <button
                      onClick={() => handleViewStudents(cls)}
                      className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200"
                    >
                      View Students
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;
