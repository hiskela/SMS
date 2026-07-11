const Class = require("../models/Class");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Notification=require("../models/Notification")

const generateClassId = async () => {
  const year = new Date().getFullYear();

  const lastClass = await Class.findOne({})
    .sort({ createdAt: -1 })
    .select("classId");

  let number = 1;

  if (lastClass && lastClass.classId) {
    number = parseInt(lastClass.classId.slice(-4)) + 1;
  }

  return `CLS${year}${String(number).padStart(4, "0")}`;
};
// CREATE
const createClass = async (req, res) => {
  try {
const classId = await generateClassId();

const newClass = await Class.create({
  ...req.body,
  classId,
});  
  res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getMyClasses = async (req, res) => {
  try {


    const teacher = await Teacher.findOne({
      user: req.user.id
    });


    if (!teacher) {
      return res.status(404).json({
        message: "Teacher profile not found"
      });
    }


    const classes = await Class.find({
      homeroomTeacher: teacher._id
    })
    .populate("students")
    .populate(
      "homeroomTeacher",
      "firstName lastName"
    );




    res.status(200).json(classes);


  } catch(err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }
};
const getMyStudents = async (req,res)=>{
  try{

    const teacher = await Teacher.findOne({
      user:req.user.id
    });


    if(!teacher){
      return res.status(404).json({
        message:"Teacher profile not found"
      });
    }


    const classes = await Class.find({
      homeroomTeacher:teacher._id
    })
    .populate("students");


    let students=[];


    classes.forEach(cls=>{
      students.push(...cls.students);
    });


    res.json(students);


  }catch(err){

    console.log(err);

    res.status(500).json({
      message:err.message
    });

  }
};

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find()
.populate("homeroomTeacher");
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET BY ID
const getClassById = async (req, res) => {
  try {
    const data = await Class.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateClass = async (req, res) => {
  try {
    const data = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const assignHomeroomTeacher = async (req,res)=>{
  try{

    const { teacherId, confirmReplace } = req.body;


    const teacher = await Teacher.findById(teacherId);

    if(!teacher){
      return res.status(404).json({
        message:"Teacher not found"
      });
    }


    const currentClass = await Class.findById(req.params.id);


    if(!currentClass){
      return res.status(404).json({
        message:"Class not found"
      });
    }



    const existingClass = await Class.findOne({
      homeroomTeacher: teacher._id,
      _id:{
        $ne:req.params.id
      }
    });



    // Teacher already has another class
    if(existingClass && !confirmReplace){

      return res.status(409).json({

        message:
        `Teacher is already assigned to ${existingClass.name}. Do you want to move this teacher?`,

        requireConfirmation:true

      });

    }



    // Remove teacher from old class
    if(existingClass && confirmReplace){

      await Class.findByIdAndUpdate(
        existingClass._id,
        {
          $unset:{
            homeroomTeacher:""
          }
        }
      );

    }



    // Assign teacher to new class

    currentClass.homeroomTeacher = teacher._id;

    await currentClass.save();



    await Notification.create({

      user:teacher.user,

      title:"New Class Assignment",

      message:
      `You have been assigned as homeroom teacher for ${currentClass.name}`,

      type:"teacher_assigned",

      relatedId:currentClass._id

    });



    res.json({

      message:"Teacher assigned successfully",

      class:currentClass

    });



  }
catch(err){

if(
err.response?.status === 409 &&
err.response.data.requireConfirmation
){

const confirm = window.confirm(
err.response.data.message
);


if(confirm){

try{

await api.put(`/classes/${classId}/assign-homeroom`,{

teacher,

confirmReplace:true

});


alert("Teacher moved successfully");

refresh();

onClose();


}catch(error){

alert(
error.response?.data?.message ||
"Failed"
);

}

}


}
else{

alert(
err.response?.data?.message ||
"Failed"
);

}

}
};
const assignStudentToClass = async (req, res) => {
  try {

    const { classId, studentId } = req.body;


    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message:"Student not found"
      });
    }


    const cls = await Class.findById(classId);

    if (!cls) {
      return res.status(404).json({
        message:"Class not found"
      });
    }


    // remove from old class if already assigned
    if(student.assignedClass){

      const oldClass = await Class.findById(student.assignedClass);

      if(oldClass){

        oldClass.students =
        oldClass.students.filter(
          id => id.toString() !== studentId
        );

        await oldClass.save();

      }

    }


    // assign new class

    student.assignedClass = cls._id;
    await student.save();


    if(!cls.students.includes(student._id)){
      cls.students.push(student._id);
    }

    await cls.save();
// Notify homeroom teacher

if (cls.homeroomTeacher) {

  const teacher = await Teacher.findById(
    cls.homeroomTeacher
  );


  if (teacher && teacher.user) {

    await Notification.create({

      user: teacher.user,

      title: "New Student Assigned",

      message:
      `Student ${student.firstName} ${student.lastName} has been assigned to your class ${cls.name}`,

      type:"student_assigned",

      relatedId:student._id

    });

  }

}

    res.json({
      message:"Student assigned successfully"
    });


  } catch(err){

    res.status(500).json({
      message:err.message
    });

  }
};
const removeStudentFromClass = async (req, res) => {
  try {
    const { classId, studentId } = req.body;

    const cls = await Class.findById(classId);

    if (!cls) {
      return res.status(404).json({
        message: "Class not found"
      });
    }

    // Remove student from class
    cls.students = cls.students.filter(
      id => id.toString() !== studentId
    );

    await cls.save();

    // Remove class assignment from student
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    student.assignedClass = null;

    await student.save();

    res.json({
      message: "Student removed successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
const moveStudentToClass = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { classId } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }


    // Get old class before changing
    const oldClass = await Class.findById(
      student.assignedClass
    ).populate("homeroomTeacher");


    // Get new class
    const newClass = await Class.findById(classId)
      .populate("homeroomTeacher");


    if (!newClass) {
      return res.status(404).json({
        message: "New class not found"
      });
    }


    // Remove from old class
    if (oldClass) {

      oldClass.students =
        oldClass.students.filter(
          id => id.toString() !== studentId
        );

      await oldClass.save();

    }


    // Add to new class
    if (!newClass.students.includes(student._id)) {
      newClass.students.push(student._id);
      await newClass.save();
    }


    // Update student
    student.assignedClass = newClass._id;
    await student.save();


    // 1. Notify student
    if(student.user){

      await Notification.create({

        user: student.user,

        title:"Class Changed",

        message:
        `You have been moved from ${
          oldClass?.name || "previous class"
        } to ${newClass.name}.`,

        type:"student_moved",
    relatedId: newClass._id


      });

    }



    // 2. Notify old teacher
    if(
      oldClass &&
      oldClass.homeroomTeacher &&
      oldClass.homeroomTeacher.user
    ){

      await Notification.create({

        user: oldClass.homeroomTeacher.user,

        title:"Student Moved",

        message:
        `${student.firstName} ${student.lastName} has been moved from your class ${oldClass.name}.`,

        type:"student_moved"

      });

    }



    // 3. Notify new teacher
    if(
      newClass.homeroomTeacher &&
      newClass.homeroomTeacher.user
    ){

      await Notification.create({

        user:newClass.homeroomTeacher.user,

        title:"New Student Assigned",

        message:
        `${student.firstName} ${student.lastName} has been assigned to your class ${newClass.name}.`,

        type:"student_assigned"

      });

    }


    res.json({
      message:"Student moved successfully"
    });


  } catch(error){

    console.log(error);

    res.status(500).json({
      message:error.message
    });

  }
};
// CLASS DETAILS
const getClassWithDetails = async (req, res) => {
  try {
    const data = await Class.findById(req.params.id)
      .populate("homeroomTeacher")
      .populate("students");

    if (!data) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTeachersForHomeroom = async (req,res)=>{
  try{

    const { mode } = req.query;

    let teachers;


    // When assigning first time
    if(mode === "available"){

      const classes = await Class.find({
        homeroomTeacher:{
          $ne:null
        }
      }).select("homeroomTeacher");


      const assignedTeacherIds =
      classes.map(c=>c.homeroomTeacher);


      teachers = await Teacher.find({
        _id:{
          $nin:assignedTeacherIds
        }
      });

    }


    // When changing teacher
    else{

      teachers = await Teacher.find();

    }


    res.json(teachers);


  }catch(err){

    res.status(500).json({
      message:err.message
    });

  }
};
// TEACHER CLASSES
const getTeacherClasses = async (req, res) => {
  try {

    const teacher = await Teacher.findOne({
      user: req.user.id
    });

    if(!teacher){
      return res.status(404).json({
        message:"Teacher not found"
      });
    }


    const classes = await Class.find({
      homeroomTeacher: teacher._id
    })
    .populate("students")
    .populate("homeroomTeacher","firstName lastName");


    res.json(classes);


  } catch(err){

    res.status(500).json({
      message:err.message
    });

  }
};

// IMPORTANT EXPORT (ONLY ONCE)
module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  assignHomeroomTeacher,
  assignStudentToClass,
  getClassWithDetails,
  getTeacherClasses,
getTeachersForHomeroom,
getMyClasses,
getMyStudents,
removeStudentFromClass,
moveStudentToClass
};