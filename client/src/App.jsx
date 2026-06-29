import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/dashboard/Dashboard";
import StudentList from "./pages/students/StudentList";
import AddStudent from "./pages/students/AddStudent";
import TeacherList from "./pages/teachers/TeacherList";
import ClassList from "./pages/classes/ClassList";
import SubjectList from "./pages/subjects/SubjectList";
import AddTeacher from "./pages/teachers/AddTeacher";
import Login from "./pages/auth/Login";
function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<StudentList />} />
<Route path="/login" element={<Login/>}/>
        <Route path="/students/add" element={<AddStudent />} />
<Route path="/teachers/add" element={<AddTeacher/>}/>
<Route path="/teachers" element={<TeacherList />} />
<Route path="/classes" element={<ClassList />} />
<Route path="/subjects" element={<SubjectList />} />
<Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;