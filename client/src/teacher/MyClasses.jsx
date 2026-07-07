import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
function MyClasses() {

  const [classes, setClasses] = useState([]);
const navigate=useNavigate();
  useEffect(() => {

    const fetchClasses = async () => {
      try {
        const res = await api.get("/classes/my-classes");

        setClasses(res.data);

      } catch(err) {
    console.log("Error:", err.response?.data || err.message);
      }
    };

    fetchClasses();

  }, []);


  return (
    <div className="p-6">
  <button
            onClick={() => navigate("/classes")}
            className="text-white mb-2 bg-pink-600 p-1 rounded"
          >
            ← Back
          </button>
      <h1 className="text-3xl font-bold">
        My Classes 📚
      </h1>


      <div className="grid md:grid-cols-3 gap-5 mt-6">

        {classes.map((cls)=>(

          <div
            key={cls._id}
            className="bg-white shadow rounded-xl p-5"
          >

            <h2 className="text-xl font-bold">
              {cls.name}
            </h2>

            <p>
              Grade: {cls.grade}
            </p>

            <p>
              Section: {cls.section}
            </p>

            <p>
              Students: {cls.students.length}
            </p>


          </div>

        ))}

      </div>

    </div>
  );
}

export default MyClasses;