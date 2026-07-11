import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import api from "../api/axios";

function AttendanceHistory() {
  const { assignmentId } = useParams();

  const [attendance, setAttendance] = useState([]);

 

  const loadAttendance = async () => {
    try {
      const res = await api.get(`/attendance/history/${assignmentId}`);

      setAttendance(res.data);
    } catch (err) {import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function AttendanceHistory() {
  const { assignmentId } = useParams();

  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const loadAttendance = async (date) => {
    if (!date) return;

    try {
      const res = await api.get(
        `/attendance/assignment/${assignmentId}/${date}`
      );

      setAttendance(res.data);
    } catch (err) {
      console.log(err);
      setAttendance([]);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
    loadAttendance(today);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Attendance History
        </h1>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            loadAttendance(e.target.value);
          }}
          className="border rounded-lg p-2"
        />

      </div>

      {attendance.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-6 text-center">
          No attendance found for this date.
        </div>

      ) : (

        <table className="w-full bg-white shadow rounded-xl overflow-hidden">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-3 text-left">Student ID</th>
              <th className="p-3 text-left">Student Name</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {attendance.map((item) => (

              <tr key={item._id} className="border-b">

                <td className="p-3">
                  {item.student.studentId}
                </td>

                <td className="p-3">
                  {item.student.firstName} {item.student.lastName}
                </td>

                <td className="p-3">
                  {item.student.gender}
                </td>

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      item.status === "Present"
                        ? "bg-green-600"
                        : item.status === "Absent"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}

export default AttendanceHistory;
      console.log(err);
    }
  };
 useEffect(() => {
    loadAttendance();
  }, []);
  return (
    <div className="p-6">
      <NavLink
        to="/teacher/assignments"
        className="bg-pink-600 text-white px-3 py-1 rounded"
      >
        ← Back
      </NavLink>

      <h1 className="text-2xl font-bold my-4">Attendance History</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Student</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((record) => (
            <tr key={record._id}>
              <td className="border p-2">
                {record.student.firstName} {record.student.lastName}
              </td>

              <td className="border p-2">
                {new Date(record.date).toLocaleDateString()}
              </td>

              <td className="border p-2">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    record.status === "Present"
                      ? "bg-green-600"
                      : record.status === "Late"
                        ? "bg-yellow-500"
                        : "bg-red-600"
                  }`}
                >
                  {record.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceHistory;
