const express=require("express");
const router=express.Router();

const authMiddleware=require("../middleware/authMiddleware");

const {
getNotifications,
markAsRead,
deleteNotification,
markAllAsRead
}=require("../controllers/notificationController");


router.get(
"/",
authMiddleware,
getNotifications
);
router.put("/mark-all-read", authMiddleware, markAllAsRead);
router.put("/:id/read", markAsRead);
router.delete("/:id", authMiddleware, deleteNotification)
router.put(
"/:id/read",
authMiddleware,
markAsRead
);



module.exports=router;