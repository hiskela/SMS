import { useEffect,useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";


function AssignStudent(){

const [classes,setClasses]=useState([]);
const [students,setStudents]=useState([]);

const [classId,setClassId]=useState("");
const [studentId,setStudentId]=useState("");

const [message,setMessage]=useState("");

const navigate=useNavigate();



useEffect(()=>{

const loadData=async()=>{

try{

const classRes=await api.get("/classes");
const studentRes=await api.get("/students");


setClasses(classRes.data);
setStudents(studentRes.data);


}catch(err){

console.log(err);

}

};


loadData();


},[]);



const handleAssign=async(e)=>{

e.preventDefault();


try{


const res=await api.post(
"/classes/assign-student",
{
classId,
studentId
}
);


setMessage(res.data.message);



}catch(err){

setMessage(
err.response?.data?.message || "Failed"
);

}


};



return(

<div className="p-6">


<h1 className="text-2xl font-bold mb-6">
Assign Student To Class
</h1>



<div className="bg-white shadow rounded-xl p-6 max-w-lg">


<form
onSubmit={handleAssign}
className="space-y-4"
>


<select
value={classId}
onChange={(e)=>setClassId(e.target.value)}
className="border p-2 rounded w-full" required 
>

<option value="">
Select Class
</option>


{
classes.map(cls=>(

<option
key={cls._id}
value={cls._id}
>

{cls.name} - Grade {cls.grade}

</option>

))

}


</select>




<select

value={studentId}

onChange={(e)=>setStudentId(e.target.value)}

className="border p-2 rounded w-full" required

>


<option value="">
Select Student
</option>


{
students.map(student=>(


<option
key={student._id}
value={student._id}
>

{student.firstName} {student.lastName}

</option>


))

}


</select>




<button
className="bg-blue-600 text-white px-4 py-2 rounded w-full"
>

Assign Student

</button>



</form>



{
message &&

<p className="mt-4 text-green-600">
{message}
</p>

}



</div>


</div>

);


}


export default AssignStudent;