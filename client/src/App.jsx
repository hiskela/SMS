import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import StudentList from "./pages/students/StudentList";
import AddStudent from "./pages/students/AddStudent";
import TeacherList from "./pages/teachers/TeacherList";
import ClassList from "./pages/classes/ClassList";
import SubjectList from "./pages/subjects/SubjectList";
import AddTeacher from "./pages/teachers/AddTeacher";
import Login from "./pages/auth/Login";
import PublicRoute from "./components/PublicRoute";
import ProtectedLayout from "./components/ProtectedLayout";
import AddClass from "./pages/classes/AddClass";
import AddSubject from "./pages/subjects/AddSubject";
import EditSubject from "./pages/subjects/EditSubject";
import EditClass from "./pages/classes/EditClass";
import AssignTeacher from "./pages/classes/AssignTeacher";
import Profile from "./pages/profile/Profile";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
<Route element={<ProtectedLayout allowedRoles={["admin"]} />}>
  <Route path="/students" element={<StudentList />} />
  <Route path="/teachers" element={<TeacherList />} />
  <Route path="/classes" element={<ClassList />} />
  <Route path="/subjects" element={<SubjectList />} />
<Route path="/subjects/add" element={<AddSubject />} />
<Route path="/subjects/edit/:id" element={<EditSubject />} />
<Route path="/classes/add" element={<AddClass/>}/>
<Route
  path="/classes/:id/assign-teacher"
  element={<AssignTeacher />}
/>

<Route
  path="/classes/edit/:id"
  element={<EditClass />}
/>
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/teachers/add" element={<AddTeacher />} />
</Route>

     
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/profile/me" element={<EditProfile />} /> */}
        <Route path="/profile/me" element={<Profile />} />


      </Route>
    </Routes>
  );
}

export default App;
