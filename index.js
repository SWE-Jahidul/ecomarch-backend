const cookieSession = require("cookie-session");
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const passport = require("passport");

const passportSetup = require("./passport");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

const { stringify } = require("nodemon/lib/utils");

app.set("port", process.env.PORT || 5000);

app.use(
  cookieSession({
    name: "session",
    keys: ["jahid"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(cors());
// parse application/json

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

const authRoute = require("./routes/auth");

app.use(
  cors({
    origin: "http://localhost:3006",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

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

  // catagory Schema
  const categorySchema = new mongoose.Schema({
    category_name: {
      type: String,
    },
    category_added_date: {
      type: Date,
      default: Date.now,
    },
  });

  // product Schema

  // const User = new mongoose.model("User", userSchema);
  const Products = new mongoose.model("Products", productSchema);

  // category Schema
  const Category = new mongoose.model("Category", categorySchema);

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

  // Post Category
  app.post("/category", (req, res) => {
    const { category_name, category_added_date } = req.body;

    Category.findOne({
      category_name: category_name,
      category_added_date: category_added_date,
    },
    (err, user) => {

      const Category11 = new Category ({
        category_name,
        category_added_date
      });
      Category11.save((err) =>{
        if(err){
          res.send(err)
          console.log(res);

        }
        else{
          res.send({
            message: "Successfully Category Added",

          })
        }
      })
    }
    );
  });
 
  // Product get Method
  app.get("/products", async (req, res) => {
    const getProduct = await Products.find({});

    res.send(getProduct);
  });

// Category get 

app.get("/category" , async(req , res ) => {
  const getCategory = await Category.find({});
  res.send(getCategory)
})

}



run().catch(console.dir);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use("/auth", authRoute);

// update Data
app.listen(app.get("port"), function () {
  console.log("Node app is running at http://localhost:" + app.get("port"));
});
