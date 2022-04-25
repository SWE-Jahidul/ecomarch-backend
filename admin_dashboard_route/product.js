const router = require("express").Router();
const mongoose = require("mongoose");
const axios = require("axios");

// product schema
const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
  },
  product_id: String,
  stock_quality: String,
  stock_qantity: Number,
  regular_price: Number,
  discount_price: Number,
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
    regular_price,
    discount_price,
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
      regular_price: regular_price,
      discount_price: discount_price,
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
        regular_price,
        discount_price,
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

const n = new Products()
n.name = "test"
n.save((err, r ) =>{
 
return  r._id
})
 console.log("--------",n);

// All Product get Method
router.get("/products", async (req, res) => {
  const getProduct = await Products.find({});
  res.send(getProduct);
});

// get Signle Products
router.get("/products/:id", async (req, res) => {
  const {id}= req.params;
  console.log('++++++++++++++', id );
  try {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const product = await Products.findOne({_id: id }) ;
    // const product = await Products.findOne({ _id: id });
    res.status(200).json(product);

    //console.log(res.send(product));
  } catch (err) {
   // console.log(err.message);
  }
  //const getProduct = await Products.find({ _id : id });
  //console.log(id);
//  res.send(id);
});

// Update Product
router.put("/products/:id", async (req, res) => {
  const id = req.params.id;

  try {
    //TODO
    const product = await Products.findById(id);
    Object.assign(product, req.body);

    res.send({ data: product });
    console.log(res.send(product));
  } catch (err) {
    console.log(err.message);
  }
});

// Delete Product
router.delete("/products/:id", async (req, res) => {
  const id = req.params.id;

  try {
    //TODO
    const product = await Products.findById(id);
    await product.remove();
    res.send({ data: true });
    console.log(res.send(product));
  } catch (err) {
    console.log(err.message);
  }
});


module.exports = router;
