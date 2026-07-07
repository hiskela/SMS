import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

function SubjectList() {

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();



  const loadSubjects = async () => {

    try {

      setLoading(true);

      const res = await api.get("/subjects");

      setSubjects(res.data);


    } catch(err){

      console.log(err);

      setError("Failed to load subjects");


    } finally {

      setLoading(false);

    }

  };



  useEffect(()=>{

    loadSubjects();

  },[]);




  const handleDelete = async(id)=>{


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?"
    );


    if(!confirmDelete) return;



    try{


      await api.delete(`/subjects/${id}`);



      setSubjects(prev =>
        prev.filter(s=>s._id !== id)
      );



    }catch(err){


      alert(
        err.response?.data?.message ||
        "Failed to delete subject"
      );


    }


  };





  const filteredSubjects = subjects.filter((s)=>{


    const text = `
      ${s.name || ""}
      ${s.code || ""}
    `.toLowerCase();


    return text.includes(
      search.toLowerCase()
    );


  });






  return (

    <div className="p-4 md:p-6">



      {/* HEADER */}

      <div className="
      flex flex-col sm:flex-row
      justify-between items-start
      sm:items-center gap-4 mb-5
      ">


        <h1 className="text-2xl font-bold">
          Subjects
        </h1>



        <button

          onClick={()=>navigate("/subjects/add")}

          className="
          bg-green-600 text-white
          px-4 py-2 rounded
          hover:bg-green-700
          "

        >

          + Add Subject

        </button>



      </div>





      {error && (

        <p className="text-red-500 mb-4">
          {error}
        </p>

      )}






      {
        loading ? (


          <p className="text-center text-gray-500 py-8">
            Loading subjects...
          </p>



        ) : (


        <>

        {/* SEARCH */}

        <input

          type="text"

          placeholder="Search subject by name or code..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          className="
          border p-2 rounded
          w-full mb-5
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          "

        />






        {
          filteredSubjects.length === 0 ? (



            <div className="text-center py-12">


              <p className="text-gray-500 text-lg">
                No subjects found
              </p>



              <p className="text-gray-400 mt-2">


                {
                  search
                  ? `No subject matches "${search}"`
                  : 'Click "Add Subject" to create a subject'
                }


              </p>


            </div>




          ) : (



          <div className="
          bg-white shadow rounded
          overflow-x-auto
          ">



          <table className="w-full">


          <thead>


          <tr className="bg-gray-200 text-left">


            <th className="p-3">
              #
            </th>


            <th className="p-3">
              Subject Name
            </th>


            <th className="p-3">
              Code
            </th>


            <th className="p-3">
              Actions
            </th>


          </tr>


          </thead>




          <tbody>



          {
            filteredSubjects.map((s,index)=>(



              <tr
                key={s._id}
                className="border-t hover:bg-gray-50"
              >



                <td className="p-3">
                  {index+1}
                </td>



                <td className="p-3 font-semibold">
                  {s.name}
                </td>




                <td className="p-3">

                  <span className="
                  bg-blue-100
                  text-blue-800
                  px-2 py-1
                  rounded
                  text-sm
                  ">

                    {s.code}

                  </span>


                </td>





                <td className="p-3">


                  <div className="flex gap-2">



                    <button

                      onClick={()=>
                        navigate(`/subjects/edit/${s._id}`)
                      }

                      className="
                      bg-blue-500
                      text-white
                      px-3 py-1
                      rounded
                      "

                    >

                      Edit

                    </button>




                    <button

                      onClick={()=>
                        handleDelete(s._id)
                      }

                      className="
                      bg-red-500
                      text-white
                      px-3 py-1
                      rounded
                      "

                    >

                      Delete

                    </button>



                  </div>


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


        )

      }



    </div>


  );

}


export default SubjectList;