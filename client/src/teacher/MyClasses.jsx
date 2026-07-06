import { useEffect, useState } from "react";
import api from "../api/axios";

function MyClasses() {

  const [classes, setClasses] = useState([]);

  useEffect(() => {

    const fetchClasses = async () => {
      try {
        const res = await api.get("/classes/my-classes");
        setClasses(res.data);

      } catch(err) {
        console.log(err);
      }
    };

    fetchClasses();

  }, []);


  return (
    <div className="p-6">

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