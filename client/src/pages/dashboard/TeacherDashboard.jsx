import { useEffect, useState } from "react";
import axios from "axios";

function TeacherDashboard() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "http://localhost:3000/api/classes/my-classes"
        );

        setClasses(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const allStudents = classes.flatMap((cls) => cls.students || []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">
        Teacher Dashboard 👨‍🏫
      </h1>

      <p className="text-gray-500 mt-2">
        Manage your classes and students
      </p>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-gray-500">My Classes</h2>
          <p className="text-3xl font-bold">
            {loading ? "..." : classes.length}
          </p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-gray-500">Total Students</h2>
          <p className="text-3xl font-bold">
            {loading ? "..." : allStudents.length}
          </p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-gray-500">Female Students</h2>
          <p className="text-3xl font-bold">
            {loading
              ? "..."
              : allStudents.filter((s) => s.gender === "Female").length}
          </p>
        </div>

      </div>

      {/* CLASSES */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">
          My Classes
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {classes.map((cls) => (
              <div
                key={cls._id}
                className="bg-white shadow p-4 rounded"
              >
                <h3 className="font-bold">{cls.name}</h3>
                <p>Grade: {cls.grade}</p>
                <p>Section: {cls.section}</p>
                <p>
                  Students: {cls.students?.length || 0}
                </p>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;