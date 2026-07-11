import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { NavLink } from "react-router-dom";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
function TakeAttendance() {
  const { assignmentId } = useParams();
const navigate=useNavigate();
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

useEffect(() => {
  const loadStudents = async () => {
  try {

    const studentRes = await api.get(
      `/attendance/students/${assignmentId}`
    );

    const fetchedStudents = studentRes.data.students;

    setStudents(fetchedStudents);


    const attendanceRes = await api.get(
      `/attendance/today/${assignmentId}`
    );


    if (attendanceRes.data.length > 0) {

      setAttendance(
        attendanceRes.data.map((record) => ({
          student: record.student,
          status: record.status,
        }))
      );

    } else {

      setAttendance(
        fetchedStudents.map((student) => ({
          student: student._id,
          status: "",
        }))
      );

    }


  } catch (err) {
    console.log(err);
  }
};
  loadStudents();
}, [assignmentId]);

const updateStatus = (studentId, status) => {
  setAttendance((prev) =>
    prev.map((record) =>
      record.student === studentId
        ? { ...record, status }
        : record
    )
  );
};
const saveAttendance = async (confirmUpdate = false) => {
  try {

    await api.post("/attendance", {
      assignmentId,
      records: attendance,
      confirmUpdate,
    });

    toast.success("Attendance saved successfully!");

    navigate(`/teacher/attendance/history/${assignmentId}`);

  } catch (err) {
    console.error(err);

    if (
      err.response?.status === 409 &&
      err.response.data.requireConfirmation
    ) {
      const answer = window.confirm(
        "Attendance already exists for today. Do you want to update it?"
      );

      if (answer) {
        saveAttendance(true);

      }

      return;
    }

    toast.error(
     
      "Failed to save attendance."
    );
  }
};
  return (
    <div>
 <NavLink to="/teacher/assignments"
            className="text-white mb-3 bg-pink-600 p-1 rounded "
          >
            ← Back
          </NavLink>
      <h1 className="text-2xl font-bold">Take Attendance</h1>

      {students.map((student) => {
        const record = attendance.find((item) => item.student === student._id);

        return (
          <div
            key={student._id}
            className="flex justify-between items-center p-4 border rounded"
          >

            <div>
              <h3 className="font-semibold">
                {student.firstName} {student.lastName}
              </h3>
            </div>

            <div className="flex gap-2">
           
<button
  onClick={() => updateStatus(student._id, "Present")}
  className={`px-3 py-1 rounded ${
    record?.status === "Present"
      ? "bg-green-600 text-white"
      : "bg-gray-200"
  }`}
>
  Present
</button>
           
            <button
  onClick={() => updateStatus(student._id, "Absent")}
  className={`px-3 py-1 rounded ${
    record?.status === "Absent"
      ? "bg-yellow-500 text-white"
      : "bg-gray-200"
  }`}
>
  Absent
</button>
   <button
  onClick={() => updateStatus(student._id, "Late")}
  className={`px-3 py-1 rounded ${
    record?.status === "Late"
      ? "bg-red-300 text-white"
      : "bg-gray-200"
  }`}
>
  Late
</button>
            </div>
          </div>
        );
      })}
{

students.length!==0?<div className="mt-6 flex justify-end">
  <button 
  onClick={() => saveAttendance(false) 

}                
  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
>
  Save Attendance
</button>
</div>:<>No Students Assigned to this class</>
}
    </div>
  );
}

export default TakeAttendance;
