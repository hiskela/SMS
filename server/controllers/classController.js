const Class = require("../models/Class");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

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


const assignTeacherToClass = async (req,res)=>{
  try{

    const { teacherId } = req.body;

const teacher = await Teacher.findById(teacherId);

if (!teacher) {
  return res.status(404).json({
    message: "Teacher not found",
  });
}
    const existingClass = await Class.findOne(
req.params.id,
{
      homeroomTeacher: teacher._id
    });


    if(
      existingClass &&
      existingClass._id.toString() !== req.params.id
    ){
      return res.status(400).json({
        message:"Teacher is already assigned to another class"
      });
    }



    const updated = await Class.findByIdAndUpdate(
      req.params.id,
      {
        homeroomTeacher: teacherId
      },
      {
        returnDocument:"after"
      }
    );


    if(!updated){
      return res.status(404).json({
        message:"Class not found"
      });
    }


    res.json({
      message:"Teacher assigned successfully",
      class:updated
    });


  }catch(err){

    res.status(500).json({
      message:err.message
    });

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
    if(student.class){

      const oldClass = await Class.findById(student.class);

      if(oldClass){

        oldClass.students =
        oldClass.students.filter(
          id => id.toString() !== studentId
        );

        await oldClass.save();

      }

    }


    // assign new class

    student.class = cls._id;
    await student.save();


    if(!cls.students.includes(student._id)){
      cls.students.push(student._id);
    }

    await cls.save();


    res.json({
      message:"Student assigned successfully"
    });


  } catch(err){

    res.status(500).json({
      message:err.message
    });

  }
};
const removeStudentFromClass = async(req,res)=>{
 try{

  const {classId, studentId}=req.body;


  const cls = await Class.findById(classId);

cls.students = cls.students.filter(
  id => id.toString() !== studentId
);

await cls.save();

const student = await Student.findById(studentId);

student.class = null;

await student.save();


  res.json({
    message:"Student removed successfully"
  });


 }catch(err){

  res.status(500).json({
    message:err.message
  });

 }

};
const moveStudentToClass = async (req, res) => {
  try {

    const { studentId, classId } = req.body;


    // Find destination class
    const newClass = await Class.findById(classId);

    if (!newClass) {
      return res.status(404).json({
        message: "Destination class not found"
      });
    }


    // Find current class
    const oldClass = await Class.findOne({
      students: studentId
    });


    if (!oldClass) {
      return res.status(404).json({
        message: "Student is not assigned to any class"
      });
    }


    // Same class check
    if(oldClass._id.toString() === classId){
      return res.status(400).json({
        message:"Student already belongs to this class"
      });
    }


    // Remove from old class
    oldClass.students =
      oldClass.students.filter(
        id => id.toString() !== studentId
      );


    await oldClass.save();



    // Add to new class
    newClass.students.push(studentId);


    await newClass.save();



    res.json({
      message:"Student moved successfully",
      from: oldClass.name,
      to:newClass.name
    });



  } catch(err){

    console.log(err);

    res.status(500).json({
      message:err.message
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
  assignTeacherToClass,
  assignStudentToClass,
  getClassWithDetails,
  getTeacherClasses,
getMyClasses,
getMyStudents,
removeStudentFromClass,
moveStudentToClass
};