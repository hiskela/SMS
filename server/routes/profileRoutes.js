const express = require("express");
const router = express.Router();
const upload=require('../middleware/upload')
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
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      user.avatar = `/uploads/${req.file.filename}`;

      await user.save();

      res.json({
        message: "Avatar updated successfully",
        avatar: user.avatar
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);
module.exports = router;