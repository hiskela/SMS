import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function ClassList() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchClasses = async () => {
    try {
      setLoading(true);

      const res = await api.get("/classes");

      setClasses(res.data);

    } catch (err) {

      console.log(err);

      setError("Failed to load classes");

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchClasses();

  }, []);



  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class?"
    );

    if (!confirmDelete) return;


    try {

      await api.delete(`/classes/${id}`);


      setClasses((prev)=>
        prev.filter((cls)=>cls._id !== id)
      );


    } catch(err){

      alert(
        err.response?.data?.message ||
        "Failed to delete class"
      );

    }

  };



  const filteredClasses = classes.filter((cls)=>{

    const text = `
      ${cls.name || ""}
      ${cls.grade || ""}
      ${cls.section || ""}
      ${cls.homeroomTeacher?.firstName || ""}
      ${cls.homeroomTeacher?.lastName || ""}
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
          Classes
        </h1>


        <button
          onClick={()=>navigate("/classes/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Class
        </button>


      </div>



      {error && (

        <p className="text-red-500 mb-4">
          {error}
        </p>

      )}



      {/* SEARCH */}

      {!loading && (

        <input

          type="text"

          placeholder="Search class by name, grade, section or teacher..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          className="
          border p-2 rounded w-full mb-5
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          "

        />

      )}




      {loading ? (

        <p className="text-center text-gray-500 py-8">
          Loading classes...
        </p>


      ) : filteredClasses.length === 0 ? (


        <div className="text-center py-12">


          <p className="text-gray-500 text-lg">
            No classes found
          </p>


          <p className="text-gray-400 mt-2">

            {
              search
              ? `No class matches "${search}"`
              : 'Click "Add Class" to create a class'
            }

          </p>


        </div>



      ) : (



        <div className="bg-white shadow rounded overflow-x-auto">


          <table className="w-full">


            <thead>

              <tr className="bg-gray-200 text-left">


                <th className="p-3">
                  #
                </th>


                <th className="p-3">
                  Name
                </th>


                <th className="p-3">
                  Grade
                </th>


                <th className="p-3">
                  Section
                </th>


                <th className="p-3">
                  Teacher
                </th>


                <th className="p-3">
                  Actions
                </th>


              </tr>

            </thead>



            <tbody>


              {filteredClasses.map((cls,index)=>(


                <tr
                  key={cls._id}
                  className="border-t hover:bg-gray-50"
                >


                  <td className="p-3">
                    {index+1}
                  </td>



                  <td className="p-3 font-semibold">
                    {cls.name}
                  </td>



                  <td className="p-3">
                    {cls.grade}
                  </td>



                  <td className="p-3">
                    {cls.section}
                  </td>



                  <td className="p-3">

                    {
                      cls.homeroomTeacher ?

                      <span className="text-green-600">
                        {cls.homeroomTeacher.firstName}
                        {" "}
                        {cls.homeroomTeacher.lastName}
                      </span>

                      :

                      <span className="text-yellow-600">
                        Not Assigned
                      </span>
                    }

                  </td>




                  <td className="p-3">

                    <div className="flex gap-2">


                      <button

                        onClick={()=>
                          navigate(`/classes/${cls._id}`)
                        }

                        className="bg-purple-600 text-white px-3 py-1 rounded"

                      >
                        View

                      </button>




                      <button

                        onClick={()=>
                          navigate(`/classes/edit/${cls._id}`)
                        }

                        className="bg-green-500 text-white px-3 py-1 rounded"

                      >
                        Edit

                      </button>





                      <button

                        onClick={()=>
                          handleDelete(cls._id)
                        }

                        className="bg-red-500 text-white px-3 py-1 rounded"

                      >

                        Delete

                      </button>



                    </div>


                  </td>



                </tr>


              ))}


            </tbody>


          </table>


        </div>


      )}


    </div>

  );

}


export default ClassList;