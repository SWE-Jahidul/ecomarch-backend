const express = require("express");
const app = express();

const mongoose = require("mongoose");

const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

app.set("port", process.env.PORT || 5000);

app.use(cors());
// parse application/json

app.use(bodyParser.json());

app.use(cors({ origin: "http://localhost:3000", credentials: false }));

//  MonngoDb Connect
mongoose.connect(
  "mongodb+srv://ecomarch:tQhOPa3fB4JGaAWD@cluster0.2du46.mongodb.net/ecomarch",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB Connected !!");
  }
);

async function run() {
  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });
  const productSchema = new mongoose.Schema({
    product_name: {
      type: String,
      required: true,
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

  // product Schema

  const User = new mongoose.model("User", userSchema);
  const Products = new mongoose.model("Products", productSchema);

  // Post product Data
  app.post(
    "/products",
    (req, res) => {
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
      User.findOne(
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
          const products = new Products({
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
          Products.save((err) => {
            if (err) {
              res.send(err);
            } else {
              res.send({
                message: "Successfully Registered, Please login now.",
              });
            }
          });
        }
      );

  
   
    
    }

    // Routes

    // SignUp post route
    // app.post("/login", (req, res) => {
    //   const { email, password } = req.body;
    //   User.findOne({ email: email }, (err, user) => {
    //     if (user) {
    //       if (password === user.password) {
    //         res.send({ message: "Login Successfull", user: user });
    //       } else {
    //         res.send({ message: "Password didn't match" });
    //       }
    //     } else {
    //       res.send({ message: "User not registered" });
    //     }
    //   });
    // });

    // app.post("/register", (req, res) => {
    //   const { name, email, password } = req.body;
    //   User.findOne({ email: email }, (err, user) => {
    //     if (user) {
    //       res.send({ message: "User already registerd" });
    //     } else {
    //       const user = new User({
    //         name,
    //         email,
    //         password,
    //       });
    //       user.save((err) => {
    //         if (err) {
    //           res.send(err);
    //         } else {
    //           res.send({ message: "Successfully Registered, Please login now." });
    //         }
    //       });
    //     }
    //   });
    // });
  );


    app.get("/products", (req, res) => {
        response = {  
          first_name:req.query.first_name,  
          last_name:req.query.last_name,
          product_name: req.query.product_name,
          product_id: req.query.product_id,
          stock_quality: req.query.stock_quality,
          stock_qantity: req.query.stock_qantity,
          min_price: req.query.min_price,
          product_brand: req.query.product_brand,
          category: req.query.category,
          product_details: req.query.product_details,
          added_date: req.query.added_date,
          thambnil: req.query.thambnil,
          img: req.query.img,
      };  
      console.log("jsdh");  
      res.end(JSON.stringify(response));  

      });




}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// update Data
app.listen(app.get("port"), function () {
  console.log("Node app is running at http://localhost:" + app.get("port"));
});
