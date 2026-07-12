const GradeSubject=require("../models/GradeSubject")

// CREATE ASSIGNMENT
exports.createGradeSubject = async (req, res) => {
  try {

    const {
      grade,
      stream,
      subjects
    } = req.body;


    const existing = await GradeSubject.findOne({
      grade,
      stream: stream || null
    });


    if(existing){
      return res.status(400).json({
        message:"Subjects already assigned for this grade."
      });
    }


    const data = await GradeSubject.create({
      grade,
      stream: stream || null,
      subjects
    });


    res.status(201).json({
      message:"Subjects assigned successfully",
      data
    });


  } catch(err){

    res.status(500).json({
      message:err.message
    });

  }
};



// GET ALL
exports.getGradeSubjects = async(req,res)=>{

try{

const data = await GradeSubject.find()
.populate("subjects");


res.json(data);


}catch(err){

res.status(500).json({
message:err.message
});

}

};



// GET BY GRADE AND STREAM

exports.getSubjectsByGrade = async(req,res)=>{

try{

const {
grade,
stream
}=req.params;


const data = await GradeSubject.findOne({

grade:Number(grade),

stream: stream === "null" ? null : stream

})
.populate("subjects");


if(!data){

return res.status(404).json({
message:"No subjects found"
});

}


res.json(data);


}catch(err){

res.status(500).json({
message:err.message
});

}

};




// UPDATE

exports.updateGradeSubject = async(req,res)=>{

try{

const updated =
await GradeSubject.findByIdAndUpdate(
req.params.id,
req.body,
{
new:true
}
);


res.json({
message:"Updated successfully",
updated
});


}catch(err){

res.status(500).json({
message:err.message
});

}

};




// DELETE

exports.deleteGradeSubject = async(req,res)=>{

try{

await GradeSubject.findByIdAndDelete(req.params.id);


res.json({
message:"Deleted successfully"
});


}catch(err){

res.status(500).json({
message:err.message
});

}

};