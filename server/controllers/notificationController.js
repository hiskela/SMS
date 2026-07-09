const Notification = require("../models/Notification");


const getNotifications = async (req,res)=>{
  try{

    const notifications = await Notification.find({
      user:req.user.id
    })
    .sort({createdAt:-1});


    res.json(notifications);

  }catch(err){

    res.status(500).json({
      message:err.message
    });

  }
};



const markAsRead = async(req,res)=>{
  try{

    const notification = await Notification.findById(req.params.id);

    notification.isRead=true;

    await notification.save();


    res.json({
      message:"Notification marked as read"
    });


  }catch(err){

    res.status(500).json({
      message:err.message
    });

  }
};

const deleteNotification= async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);

    res.json({
      message: "Notification deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports={
  getNotifications,
  markAsRead,
deleteNotification
};