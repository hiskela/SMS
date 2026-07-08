const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload');
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const {
  getMyProfile,
  updateMyProfile,
  changePassword,
  uploadAvatar
} = require("../controllers/profileController");

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);
router.put("/change-password", authMiddleware, changePassword);

// Avatar upload with correct path
router.put(
  "/avatar",
  authMiddleware,
upload.single("avatar"),
   uploadAvatar

);

module.exports = router;