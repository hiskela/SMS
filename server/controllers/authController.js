const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
exports.login=async(req, res)=>{
try{
const {username, password}=req.body;
const user=await User.findOne({username})
.populate("student")
.populate("teacher")
if(!user){
return res.status(400).json({
message: "Invalid username or password!"});
}

const match=await bcrypt.compare(password, user.password)

if(!match){
return res.status(400).json({
message: "Invalid username or password"
})
}
const token=jwt.sign({
id: user._id,
role: user.role,
teacher: user.teacher
},
process.env.JWT_SECRET,
{expiresIn: "1d",
})
let fullName = "";
    let email = "";

    if (user.role === "student" && user.student) {
      fullName = `${user.student.firstName} ${user.student.lastName}`;
      email = user.student.email;
    }

    if (user.role === "teacher" && user.teacher) {
      fullName = `${user.teacher.firstName} ${user.teacher.lastName}`;
      email = user.teacher.email;
    }

    if (user.role === "admin") {
      fullName = "Administrator";
    }
res.json({
  message: "Login successful",
  token,
  user: {
    _id: user._id,
    username: user.username,
    role: user.role,
fullName,
email
  },
});
}
catch(err){
res.status(500).json({
message: err.message
})
}
}
