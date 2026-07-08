const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const bcrypt=require("bcrypt")
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("teacher")
      .populate("student");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   let profile = {
  _id: user._id,
  username: user.username,
  role: user.role,
  avatar: user.avatar,
  email: user.email || "",
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
};
    // TEACHER PROFILE
    if (user.role === "teacher" && user.teacher) {
      profile.firstName = user.teacher.firstName;
      profile.lastName = user.teacher.lastName;
      profile.email = user.teacher.email;
      profile.phone = user.teacher.phone;
      profile.address = user.teacher.address;
    }

    // STUDENT PROFILE
    if (user.role === "student" && user.student) {
      profile.firstName = user.student.firstName;
      profile.lastName = user.student.lastName;
      profile.email = user.student.email;
      profile.phone = user.student.phone;
      profile.address = user.student.address;
    }

    // ADMIN PROFILE (important)
    if (user.role === "admin") {
      profile.firstName = "Admin";
      profile.lastName = "User";
    }

    return res.json(profile);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const changePassword = async (req, res) => {
  try {

 


    const user = await User.findById(req.user.id);


    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }


    const {
      currentPassword,
      newPassword
    } = req.body;


    if (!currentPassword || !newPassword) {

      return res.status(400).json({
        message: "Password fields are empty"
      });

    }


    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );




    if (!isMatch) {

      return res.status(400).json({
        message:"Current password is incorrect"
      });

    }


    user.password = await bcrypt.hash(
      newPassword,
      10
    );


    await user.save();


    res.json({
      message:"Password changed successfully"
    });


  } catch(err){

    console.log(err);

    res.status(500).json({
      message:err.message
    });

  }
};
const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }


    // Update username
    if(req.body.username){
      user.username = req.body.username;
    }


    // Update password
    if(req.body.password){

      const bcrypt = require("bcrypt");

      const hashedPassword = await bcrypt.hash(
        req.body.password,
        10
      );

      user.password = hashedPassword;
    }


    await user.save();



    // Update teacher information
    if (user.role === "teacher") {

      const teacher = await Teacher.findById(user.teacher);

      if(teacher){

        teacher.firstName = req.body.firstName;
        teacher.lastName = req.body.lastName;
        teacher.email = req.body.email;
        teacher.phone = req.body.phone;
        teacher.address = req.body.address;

        await teacher.save();

      }
    }



    // Update student information
    if (user.role === "student") {

      const student = await Student.findById(user.student);

      if(student){

        student.email = req.body.email;
        student.phone = req.body.phone;
        student.address = req.body.address;

        await student.save();

      }
    }


    res.json({
      message:"Profile updated successfully"
    });


  } catch(err){

    res.status(500).json({
      message:err.message
    });

  }
};



const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please select an image",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.avatar = `/uploads/avatars/${req.file.filename}`;

    await user.save();

    res.json({
      message: "Avatar updated successfully",
      avatar: user.avatar,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};


module.exports = {
  getMyProfile,
  updateMyProfile,
  changePassword,
  uploadAvatar
};

