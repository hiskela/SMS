const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      username: "admins",
      password: hashedPassword,
      role: "admin"
    });

    console.log("✅ Admin saved in DB:");
    console.log(admin);

    mongoose.connection.close();
  } catch (err) {
    console.log("❌ Error:", err.message);
  }
}

createAdmin();