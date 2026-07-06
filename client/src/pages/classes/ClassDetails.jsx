import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

function ClassDetails() {

  const { id } = useParams();

  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchClass = async()=>{

    try{

      const res = await api.get(`/classes/${id}/details`);

      setClassData(res.data);

    }catch(err){

      console.log(err);

    }finally{

      setLoading(false);

    }

  };


  useEffect(()=>{

    fetchClass();

  },[]);



  const removeStudent = async(studentId)=>{

    if(!window.confirm("Remove this student from class?"))
      return;


    try{

      await api.post(
        "/classes/remove-student",
        {
          classId:id,
          studentId
        }
      );


      fetchClass();


    }catch(err){

      console.log(err);

    }

  };



  if(loading)
    return <p className="p-6">Loading...</p>;



  if(!classData)
    return <p className="p-6">Class not found</p>;



  return (

    <div className="p-6">


      <h1 className="text-3xl font-bold mb-6">
        {classData.name} Details
      </h1>



      <div className="bg-white shadow rounded-xl p-6 mb-6">


        <h2 className="text-xl font-bold mb-3">
          Class Information
        </h2>


        <p>
          <b>Grade:</b> {classData.grade}
        </p>


        <p>
          <b>Section:</b> {classData.section}
        </p>


        <p>
          <b>Academic Year:</b> {classData.academicYear}
        </p>


        <p>
          <b>Teacher:</b>{" "}

          {
          classData.homeroomTeacher
          ?
          `${classData.homeroomTeacher.firstName} ${classData.homeroomTeacher.lastName}`
          :
          "Not Assigned"
          }

        </p>


      </div>





      <div className="bg-white shadow rounded-xl p-6">


        <h2 className="text-xl font-bold mb-4">

          Students ({classData.students.length})

        </h2>




        {
          classData.students.length ===0 ?

          <p className="text-gray-500">
            No students assigned
          </p>

          :

          <div className="space-y-3">


          {
          classData.students.map((student,index)=>(


            <div
            key={student._id}
            className="flex justify-between items-center border p-3 rounded"
            >


              <div>

              <p className="font-semibold">
              {index+1}. {student.firstName} {student.lastName}
              </p>

              <p className="text-sm text-gray-500">
                {student.email}
              </p>

              </div>



              <button

              onClick={()=>removeStudent(student._id)}

              className="bg-red-500 text-white px-3 py-1 rounded"

              >

              Remove

              </button>



            </div>


          ))
          }


          </div>


        }


      </div>


    </div>

  );

}


export default ClassDetails;