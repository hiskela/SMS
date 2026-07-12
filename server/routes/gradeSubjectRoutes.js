const express=require("express");

const router=express.Router();


const {
createGradeSubject,
getGradeSubjects,
getSubjectsByGrade,
updateGradeSubject,
deleteGradeSubject

}=require("../controllers/gradeSubjectController");



router.post("/",createGradeSubject);

router.get("/",getGradeSubjects);

router.get("/:grade/:stream",getSubjectsByGrade);

router.put("/:id",updateGradeSubject);

router.delete("/:id",deleteGradeSubject);



module.exports=router;