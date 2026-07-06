import { useEffect, useState } from "react";
import api from "../api/axios";


function MyStudents(){

const [students,setStudents]=useState([]);
const [loading,setLoading]=useState(true);


useEffect(()=>{

const fetchStudents=async()=>{

try{

const res=await api.get("/classes/my-students");

setStudents(res.data);


}catch(err){

console.log(err);

}
finally{

setLoading(false);

}

};


fetchStudents();


},[]);



return(

<div className="p-6">


<h1 className="text-3xl font-bold">
My Students 👨‍🎓
</h1>


{
loading ?

<p className="mt-5">
Loading students...
</p>


:

students.length===0 ?

<p className="mt-5 text-gray-500">
No students assigned yet.
</p>


:

<div className="mt-6 bg-white shadow rounded-xl overflow-hidden">


<table className="w-full">

<thead className="bg-gray-100">

<tr>

<th className="p-3 text-left">
Name
</th>

<th className="p-3 text-left">
Gender
</th>

<th className="p-3 text-left">
Email
</th>

<th className="p-3 text-left">
Phone
</th>

</tr>

</thead>


<tbody>

{
students.map((s)=>(

<tr 
key={s._id}
className="border-t"
>

<td className="p-3">
{s.firstName} {s.lastName}
</td>


<td className="p-3">
{s.gender}
</td>


<td className="p-3">
{s.email}
</td>


<td className="p-3">
{s.phone}
</td>


</tr>


))
}


</tbody>


</table>


</div>

}


</div>

);


}


export default MyStudents;