import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

function TeacherList() {

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const fetchTeachers = async () => {

    try {

      setLoading(true);

      const res = await api.get("/teachers");

      setTeachers(res.data);

    } catch(err) {

      console.log(err);
      setError("Failed to load teachers");

    } finally {

      setLoading(false);

    }

  };


  useEffect(()=>{

    fetchTeachers();

  },[]);



  const deleteTeacher = async(id)=>{

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );


    if(!confirmDelete) return;


    try{

      await api.delete(`/teachers/${id}`);


      setTeachers(prev =>
        prev.filter(t=>t._id !== id)
      );


    }catch(err){

      alert(
        err.response?.data?.message ||
        "Failed to delete teacher"
      );

    }

  };



  const filteredTeachers = teachers.filter((t)=>{


    const text = `
      ${t.firstName || ""}
      ${t.lastName || ""}
      ${t.teacherId || ""}
      ${t.email || ""}
      ${t.phone || ""}
    `.toLowerCase();


    return text.includes(
      search.toLowerCase()
    );


  });



  return (

    <div className="p-4 md:p-6">


      {/* HEADER */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">


        <h1 className="text-2xl font-bold">
          Teachers
        </h1>


        <button

          onClick={()=>navigate("/teachers/add")}

          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"

        >

          + Add Teacher

        </button>


      </div>



      {error && (

        <p className="text-red-500 mb-4">
          {error}
        </p>

      )}



      {loading ? (

        <p className="text-center text-gray-500 py-8">
          Loading teachers...
        </p>


      ) : (

        <>


        {/* SEARCH */}

        <input

          type="text"

          placeholder="Search teacher by name, ID, email or phone..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          className="
          border p-2 rounded w-full mb-5
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          "

        />



        {
          filteredTeachers.length === 0 ? (

            <div className="text-center py-12">

              <p className="text-gray-500 text-lg">
                No teachers found
              </p>


              <p className="text-gray-400 mt-2">

                {
                  search
                  ? `No teacher matches "${search}"`
                  : 'Click "Add Teacher" to register a teacher'
                }

              </p>


            </div>


          ) : (


          <div className="bg-white shadow rounded overflow-x-auto">


          <table className="w-full">


          <thead>

          <tr className="bg-gray-200 text-left">

          <th className="p-3">#</th>

          <th className="p-3">Name</th>

          <th className="p-3">Gender</th>

          <th className="p-3">Email</th>

          <th className="p-3">Phone</th>

          <th className="p-3">Actions</th>

          </tr>

          </thead>



          <tbody>


          {
          filteredTeachers.map((t,i)=>(


          <tr
          key={t._id}
          className="border-t hover:bg-gray-50"
          >


          <td className="p-3">
            {i+1}
          </td>


          <td className="p-3 font-semibold">
            {t.firstName} {t.lastName}
          </td>


          <td className="p-3">
            {t.gender}
          </td>


          <td className="p-3">
            {t.email || "N/A"}
          </td>


          <td className="p-3">
            {t.phone}
          </td>


          <td className="p-3">


          <button

          onClick={()=>deleteTeacher(t._id)}

          className="
          bg-red-500 text-white px-3 py-1 rounded
          hover:bg-red-600
          "

          >

          Delete

          </button>


          </td>


          </tr>


          ))

          }


          </tbody>


          </table>


          </div>


          )

        }


        </>

      )}


    </div>

  );

}


export default TeacherList;