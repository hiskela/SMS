import { useEffect, useState } from "react";

function ClassForm({
  initialData = {},
  onSubmit,
  loading = false,
}) {

  const [form, setForm] = useState({
    grade: "",
    section: "",
    stream: "General",
  });


  useEffect(() => {

  if (initialData && Object.keys(initialData).length > 0) {

      setForm({
        grade: initialData.grade || "",
        section: initialData.section || "",
        stream: initialData.stream || "General",
      });

    }

  }, [initialData]);



  const handleChange = (e) => {

    const {name,value}=e.target;


    setForm({
      ...form,
      [name]: name === "grade"
      ? Number(value)
      : value
    });

  };



  const handleGradeChange = (e)=>{

    const grade = Number(e.target.value);


    setForm({
      ...form,
  grade: grade,
      stream: grade >= 11 
        ? form.stream 
        : "General"
    });

  };



  const handleFormSubmit=(e)=>{

    e.preventDefault();


    if(
      !form.grade ||
      !form.section
    ){
      return;
    }


    onSubmit(form);

  };



return (

<form
onSubmit={handleFormSubmit}
className="space-y-4 bg-white p-6 rounded shadow"
>


<select
name="grade"
value={form.grade}
onChange={handleGradeChange}
className="w-full border rounded p-2"
required
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



{
form.grade >= 11 && (

<select
name="stream"
value={form.stream}
onChange={handleChange}
className="w-full border rounded p-2"
>

<option value="Natural">
Natural
</option>

<option value="Social">
Social
</option>

</select>

)
}



<input
type="text"
name="section"
placeholder="Section name (A, B, 1, Blue...)"
value={form.section}
onChange={handleChange}
className="w-full border rounded p-2"
required
/>



<button
type="submit"
disabled={loading}
className="bg-blue-600 hover:bg-blue-700 text-black px-5 py-2 rounded"
>

{
loading 
? "Saving..."
: "Save Class"
}

</button>


</form>

);

}

export default ClassForm;