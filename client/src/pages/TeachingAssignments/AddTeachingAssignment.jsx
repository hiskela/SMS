import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
function AddTeachingAssignment(){

const navigate = useNavigate();

const [teachers,setTeachers]=useState([]);
const [subjects,setSubjects]=useState([]);
const [classes,setClasses]=useState([]);

const [form,setForm]=useState({
 teacher:"",
 subject:"",
 class:"",
 academicYear:"2025-2026",
 semester:"1"
});


useEffect(()=>{

const loadData=async()=>{

try{

const teacherRes = await api.get("/teachers");
const subjectRes = await api.get("/subjects");
const classRes = await api.get("/classes");


setTeachers(teacherRes.data);
setSubjects(subjectRes.data);
setClasses(classRes.data);


}catch(err){
console.log(err);
}

}

loadData();

},[]);



const handleSubmit=async(e)=>{

e.preventDefault();

try{

await api.post("/teaching-assignments",form);

toast.success("Assignment created");

navigate("/teaching-assignments");


}catch(err){

toast.error(
"Failed to create Assignment"
);

}

};



return(

<div className="p-6">

<h1 className="text-2xl font-bold mb-6">
Assign Subject To Teacher
</h1>


<form 
onSubmit={handleSubmit}
className="bg-white shadow rounded-lg p-6 space-y-5"
>


<select
className="border p-3 w-full rounded"
value={form.teacher}
onChange={(e)=>setForm({
...form,
teacher:e.target.value
})}
>

<option value="">
Select Teacher
</option>

{
teachers.map(t=>(
<option key={t._id} value={t._id}>
{t.firstName} {t.lastName}
</option>
))
}

</select>



<select
className="border p-3 w-full rounded"
value={form.subject}
onChange={(e)=>setForm({
...form,
subject:e.target.value
})}
>

<option value="">
Select Subject
</option>

{
subjects.map(s=>(
<option key={s._id} value={s._id}>
{s.name}
</option>
))
}

</select>



<select
className="border p-3 w-full rounded"
value={form.class}
onChange={(e)=>setForm({
...form,
class:e.target.value
})}
>

<option value="">
Select Class
</option>

{
classes.map(c=>(
<option key={c._id} value={c._id}>
{c.name}
</option>
))
}

</select>



<select
className="border p-3 w-full rounded"
value={form.semester}
onChange={(e)=>setForm({
...form,
semester:e.target.value
})}
>

<option value="1">
Semester 1
</option>

<option value="2">
Semester 2
</option>

</select>



<button
className="bg-green-600 text-white px-5 py-2 rounded"
>
Save Assignment
</button>


</form>


</div>

)

}

export default AddTeachingAssignment;