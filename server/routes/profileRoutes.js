const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getMyProfile,
  updateMyProfile,
changePassword,
uploadAvatar
} = require("../controllers/profileController");

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);
router.put("/change-password",authMiddleware,changePassword);
router.put(
"/avatar",
authMiddleware,
upload.single("avatar"),
uploadAvatar
);
module.exports = router;