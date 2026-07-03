const express = require("express");
const router = express.Router();

const {
  getMyProfile,
  updateMyProfile,
} = require("../controllers/profileController");

router.get("/me", getMyProfile);
router.put("/me", updateMyProfile);

module.exports = router;