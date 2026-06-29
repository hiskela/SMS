const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
exports.login=async(req, res)=>{
try{
const {username, password}=req.body;
const user=await User.findOne({username});
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
},
process.env.JWT_SECRET,
{expiresIn: "1d",
})

res.json({
message: "Login successful",
token,
role: user.role,
ussername: user.username,
});
}
catch(err){
res.status(500).json({
message: err.message
})
}
}
