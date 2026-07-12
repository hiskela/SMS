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
import AssignTeacher from "./pages/classes/components/AddTeacherModal";
import Profile from "./pages/profile/Profile";
import ClassDetails from "./pages/classes/ClassDetails";
import MyClasses from "./teacher/MyClasses";
import MyStudents from "./teacher/MyStudents";
import AssignStudent from "./pages/classes/components/AddStudentModal";
import StudentDetails from "./pages/students/StudentDetails";
import EditStudent from "./pages/students/EditStudent";
import EditTeacher from "./pages/teachers/EditTeacher";
import TeacherDetails from "./pages/teachers/TeacherDetails";
import Settings from "./pages/settings/Settings";
import TeachingAssignmentList from "./pages/TeachingAssignments/TeachingAssignmentList";
import AddTeachingAssignment from "./pages/TeachingAssignments/AddTeachingAssignment";
import MySubjects from "./pages/TeachingAssignments/MySubjects";
import TakeAttendance from "./teacher/TakeAttendance";
import TeacherAssignments from "./teacher/TeacherAssignments";
import AttendanceHistory from "./teacher/AttendanceHistory";
import AttendanceDetails from "./teacher/AttendanceDetails";
import AssignGradeSubjects from "./pages/classes/components/AssignGradeSubjects";
import MySubjectsForStudent from "./student/MySubjects"
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
          <Route path="/classes/assign-student" element={<AssignStudent />} />
          <Route path="/teachers/:id" element={<TeacherDetails />} />

          <Route path="/teachers/edit/:id" element={<EditTeacher />} />
          <Route path="/classes/:id" element={<ClassDetails />} />
          <Route path="/classes" element={<ClassList />} />
          <Route path="/subjects" element={<SubjectList />} />
          <Route path="/subjects/add" element={<AddSubject />} />
          <Route path="/subjects/edit/:id" element={<EditSubject />} />
          <Route path="/classes/add" element={<AddClass />} />
          <Route
            path="/classes/:id/assign-teacher"
            element={<AssignTeacher />}
          />
          <Route
            path="/grade-subjects/assign"
            element={<AssignGradeSubjects />}
          />
          <Route
            path="/teaching-assignments"
            element={<TeachingAssignmentList />}
          />

          <Route
            path="/teaching-assignments/add"
            element={<AddTeachingAssignment />}
          />
          <Route path="/settings" element={<Settings />} />

          <Route path="/classes/:id" element={<ClassDetails />} />

          <Route path="/classes/edit/:id" element={<EditClass />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/teachers/add" element={<AddTeacher />} />
          <Route path="/students/:id" element={<StudentDetails />} />

          <Route path="/students/edit/:id" element={<EditStudent />} />
        </Route>
        <Route element={<ProtectedLayout allowedRoles={["teacher"]} />}>
          <Route path="/my-subjects" element={<MySubjects />} />
          <Route path="/my-classes" element={<MyClasses />} />
          <Route path="/my-students" element={<MyStudents />} />
          <Route
            path="/teacher/attendance/:assignmentId"
            element={<TakeAttendance />}
          />
          <Route path="/teacher/assignments" element={<TeacherAssignments />} />
          <Route
            path="/teacher/attendance/history/:assignmentId"
            element={<AttendanceHistory />}
          />

          <Route
            path="/teacher/attendance/details/:assignmentId/:date"
            element={<AttendanceDetails />}
          />
        </Route>
        <Route element={<ProtectedLayout allowedRoles={["student"]} />}>

<Route path="/student/subjects" element={<MySubjectsForStudent />} />
        </Route>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/me" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
