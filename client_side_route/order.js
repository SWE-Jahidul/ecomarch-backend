const router = require("express").Router();
const mongoose = require("mongoose");

// Add an Admin  Schema
const orderSchema = new mongoose.Schema({
  order_name: {
    type: String,
  },
});

const Order = new mongoose.model("AddOrder", orderSchema);

router.post("/orders", (req, res) => {
  const { order_name } = req.body;
  console.log("orders");
  
  Order.findOne(
    {
      order_name: order_name,
    },
    (err, user) => {
      const order11 = new Order({
        order_name,
      });
      order11.save((err) => {
        if (err) {
          res.send(err);
          console.log("rrr", res);
        } else {
          res.send({
            message: "Successfully order Added ,",
          });
        }
      });
    }
  );
});


 // Product get Method
 router.get("/orders", async (req, res) => {
  const getOrder = await Order.find({});
console.log('ooooooooooooooooooooooooooooooo');
  res.send(getOrder);
});



module.exports = router