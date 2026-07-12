import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";

function AssignGradeSubjects() {

  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [form, setForm] = useState({
    grade: "",
    stream: "General",
  });

  const [loading, setLoading] = useState(false);


  useEffect(() => {

    const fetchSubjects = async()=>{

      try{

        const res = await api.get("/subjects");

        setSubjects(res.data);

      }catch(err){

        console.log(err);

      }

    };


    fetchSubjects();

  },[]);



  const handleChange=(e)=>{

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };



  const handleSubjectChange=(id)=>{


    if(selectedSubjects.includes(id)){

      setSelectedSubjects(
        selectedSubjects.filter(
          item=>item !== id
        )
      );


    }else{

      setSelectedSubjects([
        ...selectedSubjects,
        id
      ]);

    }

  };



  const handleSubmit=async(e)=>{

    e.preventDefault();


    if(!form.grade || selectedSubjects.length===0){

      toast.error(
        "Select grade and subjects"
      );

      return;

    }


    try{

      setLoading(true);


      await api.post(
        "/grade-subjects",
        {
          grade:Number(form.grade),
          stream:
            form.grade >= 11
            ? form.stream
            : "General",

          subjects:selectedSubjects
        }
      );


      toast.success(
        "Subjects assigned successfully"
      );


      setSelectedSubjects([]);

      setForm({
        grade:"",
        stream:"General"
      });


    }catch(err){

      toast.error(
        err.response?.data?.message ||
        "Failed to assign subjects"
      );

    }finally{

      setLoading(false);

    }

  };



return (

<div className="p-6 max-w-3xl mx-auto">

<h1 className="text-2xl font-bold mb-6">
Assign Subjects To Grade
</h1>


<form
onSubmit={handleSubmit}
className="bg-white shadow rounded-lg p-6 space-y-5"
>


{/* Grade */}

<div>

<label className="font-medium">
Grade
</label>


<select
name="grade"
value={form.grade}
onChange={handleChange}
className="border p-2 w-full rounded"
>

<option value="">
Select Grade
</option>

<option value="9">
Grade 9
</option>

<option value="10">
Grade 10
</option>

<option value="11">
Grade 11
</option>

<option value="12">
Grade 12
</option>


</select>

</div>




{/* Stream */}

{
(form.grade==="11" || form.grade==="12") && (

<div>

<label className="font-medium">
Stream
</label>


<select
name="stream"
value={form.stream}
onChange={handleChange}
className="border p-2 w-full rounded"
>

<option value="Natural">
Natural
</option>

<option value="Social">
Social
</option>

</select>


</div>

)
}





{/* Subjects */}

<div>

<label className="font-medium">
Subjects
</label>


<div className="grid grid-cols-2 gap-3 mt-3">


{
subjects.map(subject=>(

<label
key={subject._id}
className="border rounded p-3 flex gap-2"
>


<input
type="checkbox"
checked={
selectedSubjects.includes(
subject._id
)
}
onChange={()=>handleSubjectChange(subject._id)}
/>


<span>
{subject.name}
</span>


</label>


))
}


</div>

</div>




<button
disabled={loading}
className="bg-blue-600 text-white px-5 py-2 rounded"
>

{
loading
?
"Saving..."
:
"Save"
}

</button>


</form>


</div>

);


}

export default AssignGradeSubjects;