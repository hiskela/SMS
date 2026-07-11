import { useEffect, useState } from "react";
import api from "../../api/axios";

function MySubjects() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await api.get(
          "/teaching-assignments/my-assignments"
        );

        setAssignments(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);
const filteredAssignments = assignments.filter(item =>
    item.subject?.name
        .toLowerCase()
        .includes(search.toLowerCase())
);
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Subjects
      </h1>

      {assignments.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-8 text-center">

          <h2 className="text-xl font-semibold">
            No Subjects Assigned
          </h2>

          <p className="text-gray-500 mt-2">
            Contact the administrator.
          </p>

        </div>

      ) : (
<><input
    type="text"
    placeholder="Search subject..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border p-2 rounded-lg w-full mb-5"
/><div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">

    <div className="bg-white shadow rounded-xl p-5">
        <h3>Total Subjects</h3>
        <p className="text-3xl font-bold">
            {assignments.length}
        </p>
    </div>

    <div className="bg-white shadow rounded-xl p-5">
        <h3>Total Classes</h3>
        <p className="text-3xl font-bold">
            {
                new Set(
                    assignments.map(a => a.class?._id)
                ).size
            }
        </p>
    </div>

</div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {filteredAssignments.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
            >

              <h2 className="text-2xl font-bold text-blue-700">
                {item.subject?.name}
              </h2>

              <p className="text-gray-500 mb-3">
                {item.subject?.code}
              </p>

              <div className="space-y-2">

                <p>
                  <strong>Class:</strong>{" "}
                  {item.class?.name}
                </p>

                <p>
                  <strong>Grade:</strong>{" "}
                  {item.class?.grade}
                </p>

                <p>
                  <strong>Semester:</strong>{" "}
                  {item.semester}
                </p>

                <p>
                  <strong>Academic Year:</strong>{" "}
                  {item.academicYear}
                </p>

              </div>

            </div>

          ))}

        </div>
</>
      )}

    </div>
  );
}

export default MySubjects;