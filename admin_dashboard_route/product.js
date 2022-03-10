const router = require("express").Router();
const mongoose = require("mongoose");

 // product schema
 const productSchema = new mongoose.Schema({
    product_name: {
      type: String,
    },
    product_id: String,
    stock_quality: String,
    stock_qantity: Number,
    min_price: Number,
    product_brand: String,
    category: String,
    product_details: String,
    added_date: {
      type: Date,
      default: Date.now,
    },
    thambnil: {
      data: Buffer,
      contentType: String,
    },
    img: {
      data: Buffer,
      contentType: String,
    },
  });

  const Products = new mongoose.model("Products", productSchema);

   // Post product Data
   router.post("/products", (req, res) => {
    const {
      product_name,
      product_id,
      stock_quality,
      stock_qantity,
      min_price,
      product_brand,
      category,
      product_details,
      added_date,
      thambnil,
      img,
    } = req.body;
    Products.findOne(
      {
        product_name: product_name,
        product_id: product_id,
        stock_quality: stock_quality,
        stock_qantity: stock_qantity,
        min_price: min_price,
        product_brand: product_brand,
        category: category,
        product_details: product_details,
        added_date: added_date,
        thambnil: thambnil,
        img: img,
      },
      (err, user) => {
        const product11 = new Products({
          product_name,
          product_id,
          stock_quality,
          stock_qantity,
          min_price,
          product_brand,
          category,
          product_details,
          added_date,
          thambnil,
          img,
        });
        product11.save((err) => {
          if (err) {
            res.send(err);
            console.log("rrr", res);
          } else {
            res.send({
              message: "Successfully Product Added , Please login now.",
            });
          }
        });
      }
    );
  });

   // Product get Method
   router.get("/products", async (req, res) => {
    const getProduct = await Products.find({});
    res.send(getProduct);
  });

  module.exports = router;