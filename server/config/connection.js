const mongoose=require("mongoose")
async function connection(){
try{
await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Database connected successfully");

}
catch(err){
        console.log("❌ Database connection failed:", err.message);
process.exit(1);
}

}
module.exports=connection;