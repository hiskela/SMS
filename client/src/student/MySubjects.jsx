import { useEffect, useState } from "react";
import api from "../api/axios";

function MySubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const fetchSubjects = async () => {
    try {
      setLoading(true);

      const res = await api.get("/students/my-subjects");

      setSubjects(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
 useEffect(() => {
    fetchSubjects();
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-12 w-12 rounded-full border-b-2 border-blue-600 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Subjects
      </h1>

      {subjects.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          No subjects assigned yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {subjects.map((subject) => (

            <div
              key={subject._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-5"
            >

              <h2 className="text-xl font-bold text-blue-700">
                {subject.name}
              </h2>

              <p className="mt-2 text-gray-500">
                Code: {subject.code}
              </p>

              {subject.description && (
                <p className="mt-4 text-gray-700">
                  {subject.description}
                </p>
              )}

              <div className="mt-5">

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    subject.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {subject.status}
                </span>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default MySubjects;