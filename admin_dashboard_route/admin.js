const router = require("express").Router();
const mongoose = require("mongoose");



  // Add an Admin  Schema

  const adminSchema = new mongoose.Schema({
    admin_name: {
      type: String,
    },
    admin_type: {
      type: String,
    },
    admin_user_name: {
      type: String,
    },
    admin_user_email: {
      type: String,
    },
    admin_profile_details: {
      type: String,
    },
    admin_phone: {
      type: Number,
    },
    profile_images: {
      img: {
        data: Buffer,
        contentType: String,
      },
    },
  });

  // const User = new mongoose.model("User", userSchema);

  //  Add an Admin
  const AddAdmin = new mongoose.model("AddAdmin", adminSchema);


  // Post an Admin
  router.post("/admin", (req, res) => {
    const {
      admin_name,
      admin_type,
      admin_user_name,
      admin_user_email,
      admin_profile_details,
      admin_phone,
      profile_images,
    } = req.bidy;
    AddAdmin.findOne(
      {
        admin_name: admin_name,
        admin_type: admin_type,
        admin_user_name: admin_user_name,
        admin_user_email: admin_user_email,
        admin_profile_details: admin_profile_details,
        admin_phone: admin_phone,
        profile_images: profile_images,
      },
      (err, user) => {
        const AddAdmin1 = new AddAdmin({
          admin_name,
          admin_type,
          admin_user_name,
          admin_user_email,
          admin_profile_details,
          admin_phone,
          profile_images,
        });
        AddAdmin1.save((err) => {
          if (err) {
            res.send(err);
            console.log(res);
          } else {
            res.send({
              message: "Successfully Category Added",
            });
          }
        });
      }
    );
  });

 

  // get Admin 
  router.get("/admin" , async(req, res) => {
    const getAdmin = await AddAdmin.find({});
    res.send(getAdmin);
    console.log("i am admin page ");
  })



module.exports = router;