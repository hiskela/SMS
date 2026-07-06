import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

function ClassDetails() {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/classes/details/${id}`);
        setClassData(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!classData) return <p>No class found</p>;

  return (
    <div className="p-6 space-y-6">

      {/* CLASS INFO */}
      <div className="bg-white shadow rounded p-4">
        <h1 className="text-2xl font-bold">
          {classData.name}
        </h1>

        <p>Grade: {classData.grade}</p>
        <p>Section: {classData.section}</p>

        <p>
          Teacher:{" "}
          {classData.homeroomTeacher
            ? `${classData.homeroomTeacher.firstName} ${classData.homeroomTeacher.lastName}`
            : "Not Assigned"}
        </p>
      </div>

      {/* STUDENTS */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-bold mb-3">
          Students
        </h2>

        {classData.students.length === 0 ? (
          <p>No students yet</p>
        ) : (
          <ul className="space-y-2">
            {classData.students.map((s) => (
              <li key={s._id} className="border-b py-2">
                {s.firstName} {s.lastName} - Grade {s.grade}
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}

export default ClassDetails;