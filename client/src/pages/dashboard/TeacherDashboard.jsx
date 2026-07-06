import { useEffect, useState } from "react";
import api from "../../api/axios";

function TeacherDashboard() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await api.get("/classes/my-classes");
        setClasses(res.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Remove duplicate students
  const students = [
    ...new Map(
      classes
        .flatMap((cls) => cls.students || [])
        .map((student) => [student._id, student])
    ).values(),
  ];

  const femaleStudents = students.filter(
    (student) => student.gender === "Female"
  ).length;

  return (
    <div className="p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold">
        Welcome Back 👋
      </h1>

      <p className="text-gray-500 mt-2">
        Here's an overview of your classes and students.
      </p>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <div className="bg-white rounded-xl shadow-md border-t-4 border-blue-700 p-6">
          <h2 className="text-gray-500">📚 My Classes</h2>

          <p className="text-4xl font-bold mt-2">
            {loading ? "..." : classes.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md border-t-4 border-green-400 p-6">
          <h2 className="text-gray-500">👨‍🎓 My Students</h2>

          <p className="text-4xl font-bold mt-2">
            {loading ? "..." : students.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md border-t-4 border-pink-900 p-6">
          <h2 className="text-gray-500">👧 Female Students</h2>

          <p className="text-4xl font-bold mt-2">
            {loading ? "..." : femaleStudents}
          </p>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-8">

        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-3">

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            My Students
          </button>

          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Attendance
          </button>

          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
            Grades
          </button>

        </div>

      </div>

      {/* MY CLASSES */}
      <div className="mt-8">

        <h2 className="text-2xl font-semibold mb-4">
          My Classes
        </h2>

        {loading ? (

          <p>Loading classes...</p>

        ) : classes.length === 0 ? (

          <div className="bg-white rounded-xl shadow-md p-8 text-center">

            <h3 className="text-xl font-semibold">
              No Classes Assigned
            </h3>

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
                    <strong>Students:</strong>{" "}
                    {cls.students?.length || 0}
                  </p>

                </div>

                <button
                  className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                  View Students
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default TeacherDashboard;