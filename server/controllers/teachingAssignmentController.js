const TeachingAssignment = require("../models/TeachingAssignment");
const Teacher=require("../models/Teacher")
const createAssignment = async (req, res) => {
  try {

    const {
      teacher,
      subject,
      class: classId,
      academicYear,
      semester
    } = req.body;


    if (!teacher || !subject || !classId) {
      return res.status(400).json({
        message:
        "Teacher, subject and class are required"
      });
    }


    // prevent duplicate assignment
    const existing =
    await TeachingAssignment.findOne({
      teacher,
      subject,
      class: classId,
      academicYear,
      semester
    });


    if(existing){

      return res.status(400).json({
        message:
        "This assignment already exists"
      });

    }



    // prevent two teachers teaching same subject in same class

    const subjectAlreadyAssigned =
    await TeachingAssignment.findOne({

      subject,

      class: classId,

      academicYear,

      semester

    });


    if(subjectAlreadyAssigned){

      return res.status(400).json({

        message:
        "This subject is already assigned to this class"

      });

    }



    const assignment =
    await TeachingAssignment.create({

      teacher,

      subject,

      class: classId,

      academicYear,

      semester

    });



    res.status(201).json({

      message:
      "Teaching assignment created successfully",

      assignment

    });


  } catch(err){

    res.status(500).json({

      message:err.message

    });

  }
};
const getAssignments = async (req, res) => {
  try {
    const assignments = await TeachingAssignment.find()
      .populate("teacher")
      .populate("subject")
      .populate("class");

    res.json(assignments);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const getAssignmentById = async (req, res) => {
  try {
    const assignment = await TeachingAssignment.findById(req.params.id)
      .populate("teacher")
      .populate("subject")
      .populate("class");

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    res.json(assignment);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const getTeacherAssignments = async(req,res)=>{

try{

const assignments =
await TeachingAssignment.find({

teacher:req.params.teacherId

})
.populate("subject")
.populate("class");


res.json(assignments);


}catch(err){

res.status(500).json({

message:err.message

});

}

};

const updateAssignment = async(req,res)=>{

try{

const updated =
await TeachingAssignment.findByIdAndUpdate(

req.params.id,

req.body,

{
 new:true
}

);


if(!updated){

return res.status(404).json({

message:"Assignment not found"

});

}


res.json({

message:"Assignment updated",

assignment:updated

});


}catch(err){

res.status(500).json({

message:err.message

});

}

};

const deleteAssignment = async (req, res) => {
  try {
    const deleted = await TeachingAssignment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    res.json({
      message: "Assignment deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const getClassAssignments = async(req,res)=>{

try{


const assignments =
await TeachingAssignment.find({

class:req.params.classId

})
.populate("teacher")
.populate("subject");


res.json(assignments);


}catch(err){

res.status(500).json({

message:err.message

});

}


};

const getMyTeachingAssignments = async (req,res)=>{
  try{


    const teacher = await Teacher.findOne({
      user:req.user.id
    });


    if(!teacher){
      return res.status(404).json({
        message:"Teacher profile not found"
      });
    }


    const assignments = await TeachingAssignment.find({
      teacher: teacher._id
    })
    .populate(
      "subject",
      "name code"
    )
    .populate({
  path:"class",
  select:"name grade section students",
  populate:{
    path:"students",
    select:"firstName lastName gender studentId"
  }
})
    .populate(
      "teacher",
      "firstName lastName"
    );


    res.json(assignments);


  }catch(err){

    res.status(500).json({
      message:err.message
    });

  }
};
module.exports={
createAssignment,
getAssignments,
getAssignmentById,
deleteAssignment,
getTeacherAssignments,
getClassAssignments,
updateAssignment,
getMyTeachingAssignments,



}