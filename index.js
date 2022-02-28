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
app.post("/products", (req, res) => {
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

   Products.save((err) => {
    if (err) {
      res.status(500).json({ error: " There was a server side error !" });
    } else {
      const result = productsCollectioin.insertOne(Products);
      res.json(result);
      console.log("rtesfwe");
    }
  });
});



app.get("/products", async (req, res) => {
  const cursor = productsCollectioin.find({});
  const review = await cursor.toArray();
  res.send(review);
  console.log("rtesfwsddddddddddddddddddddddde");
});

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

}
run().catch(console.dir)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// update Data
app.listen(app.get("port"), function () {
  console.log("Node app is running at http://localhost:" + app.get("port"));
});
