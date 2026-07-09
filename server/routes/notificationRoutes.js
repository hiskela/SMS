const express=require("express");
const router=express.Router();

const authMiddleware=require("../middleware/authMiddleware");

const {
getNotifications,
markAsRead,
deleteNotification
}=require("../controllers/notificationController");


router.get(
"/",
authMiddleware,
getNotifications
);

router.delete("/:id", authMiddleware, deleteNotification)
router.put(
"/:id/read",
authMiddleware,
markAsRead
);



module.exports=router;