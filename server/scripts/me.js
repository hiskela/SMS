const bcrypt = require("bcrypt")
const password = "passwordToTest";
const hash = "$2b$10$Th1mDofn71nfKXj2W6K3le1sf5MfwXqScSPkpgfY72fZE/r5T82WS";

const result = await bcrypt.compare(password, hash);

console.log(result);