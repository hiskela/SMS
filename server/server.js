const express=require("express")
const cors=require("cors")
const app=express();
const dotenv=require('dotenv')
dotenv.config();

const connectDB=require("./config/connection")
const  dashboardRoute=require('./routes/dashboardRoute')
const studentRoutes=require("./routes/studentRoutes")
const teacherRoutes=require("./routes/teacherRoutes")
const classRoutes=require("./routes/classRoutes")
const subjectRoutes=require("./routes/subjectRoutes")
const authRoutes=require("./routes/authRoutes")
const teachingAssignmentRoutes = require("./routes/teachingAssignmentRoutes");
const profileRoutes=require("./routes/profileRoutes")

connectDB();
app.use(cors())
app.use(express.json())

app.use("/api/dashboard", dashboardRoute)
app.use("/api/students", studentRoutes)
app.use("/api/teachers", teacherRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/classes", classRoutes)
app.use("/api/subjects", subjectRoutes)
app.use("/api/classes", classRoutes)
app.use("/api/assignments", teachingAssignmentRoutes);
app.use("/api/profile", profileRoutes);
const PORT=process.env.PORT||3000;
app.listen(PORT, ()=>{
console.log(`runnnig on port ${PORT}`);

})