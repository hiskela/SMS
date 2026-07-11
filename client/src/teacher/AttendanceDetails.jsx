import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function AttendanceDetails() {

  const { assignmentId, date } = useParams();
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState([]);


  useEffect(() => {

    const loadAttendance = async () => {

      try {

        const res = await api.get(
          `/attendance/details/${assignmentId}/${date}`
        );
        setAttendance(res.data.attendance|| res.data);

      } catch (err) {

        console.log(err);

      }

    };


    loadAttendance();

  }, [assignmentId, date]);



  const present = attendance.filter(
    item => item.status === "Present"
  ).length;


  const absent = attendance.filter(
    item => item.status === "Absent"
  ).length;


  const late = attendance.filter(
    item => item.status === "Late"
  ).length;



  return (

    <div className="p-6 max-w-7xl mx-auto">


      <button
        onClick={() => navigate(-1)}
        className="
        bg-gray-600
        text-white
        px-4
        py-2
        rounded-lg
        mb-6
        "
      >
        ← Back
      </button>



      <div className="bg-white shadow rounded-xl p-6 mb-6">


        <h1 className="text-3xl font-bold mb-3">
          Daily Attendance Details
        </h1>


        <p className="text-gray-600 mb-5">
          Date: {date}
        </p>



        <div className="grid md:grid-cols-4 gap-4">


          <div className="bg-blue-100 p-4 rounded-xl">

            <h3 className="font-semibold">
              Total Students
            </h3>

            <p className="text-2xl font-bold">
              {attendance.length}
            </p>

          </div>



          <div className="bg-green-100 p-4 rounded-xl">

            <h3 className="font-semibold">
              Present
            </h3>

            <p className="text-2xl font-bold text-green-700">
              {present}
            </p>

          </div>



          <div className="bg-red-100 p-4 rounded-xl">

            <h3 className="font-semibold">
              Absent
            </h3>

            <p className="text-2xl font-bold text-red-700">
              {absent}
            </p>

          </div>



          <div className="bg-yellow-100 p-4 rounded-xl">

            <h3 className="font-semibold">
              Late
            </h3>

            <p className="text-2xl font-bold text-yellow-700">
              {late}
            </p>

          </div>


        </div>


      </div>




      <div className="bg-white shadow rounded-xl overflow-hidden">


        <table className="w-full">


          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-3 text-left">
                Student ID
              </th>

              <th className="p-3 text-left">
                Student Name
              </th>

              <th className="p-3 text-left">
                Gender
              </th>

              <th className="p-3 text-left">
                Status
              </th>

            </tr>

          </thead>



          <tbody>


            {attendance.map(item => (

              <tr 
                key={item._id}
                className="border-b"
              >


                <td className="p-3">
                  {item.student?.studentId}
                </td>



                <td className="p-3">

                  {item.student?.firstName}
                  {" "}
                  {item.student?.lastName}

                </td>



                <td className="p-3">
                  {item.student?.gender}
                </td>



                <td className="p-3">


                  <span
                    className={`
                    px-3
                    py-1
                    rounded-full
                    text-white
                    
                    ${
                      item.status === "Present"
                      ?
                      "bg-green-600"
                      :
                      item.status === "Late"
                      ?
                      "bg-yellow-500"
                      :
                      "bg-red-600"
                    }
                    `}
                  >

                    {item.status}

                  </span>


                </td>


              </tr>

            ))}


          </tbody>


        </table>


      </div>


    </div>

  );

}


export default AttendanceDetails;