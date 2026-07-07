import { useEffect, useState } from "react";
import { useSettings } from "../../context/SettingsContext";
import axios from "axios";
function AdminDashboard() {
const {settings}=useSettings();
const [stats, setStats]=useState({})
useEffect(()=>{
axios.get("http://localhost:3000/api/dashboard/stats")
.then((res)=>setStats(res.data))
.catch((err)=>console.log(err))
}, [])
  return (
    <div>
<div className="flex justify-between">
<h2 className="text-sm  font-bold">Academic Year : <span className="text-xl font-bold">{settings?.academicYear}</span></h2>
<h2 className="text-xl font-bold">Semester : <span className="text-sm ">{settings?.semester}</span></h2>

</div>
      <h1 className="text-3xl font-bold">
        Welcome Back 👋
      </h1>

      <p className="text-gray-600 mt-2">
     {settings?.schoolName} Dashboard
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-gray-500">Students</h2>
          <p className="text-4xl font-bold mt-2">{stats.students}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-gray-500">Teachers</h2>
          <p className="text-4xl font-bold mt-2">{stats.teachers}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-gray-500">Classes</h2>
          <p className="text-4xl font-bold mt-2">{stats.classes}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-gray-500">Subjects</h2>
          <p className="text-4xl font-bold mt-2">{stats.subjects}</p>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;