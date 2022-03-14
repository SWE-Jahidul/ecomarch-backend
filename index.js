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
const orderRoute = require("./client_side_route/order");

// Admin All Route
// Product Route
const productRoute = require("./admin_dashboard_route/product");
// Category Route
const catagorRoute = require("./admin_dashboard_route/catagory");
// Admin Route
const adminRoute = require("./admin_dashboard_route/admin");

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
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use("/auth", authRoute);

app.use("/order", orderRoute);

app.use("/product", productRoute);

app.use("/category", catagorRoute);

app.use("/admin", adminRoute);

// update Data
app.listen(app.get("port"), function () {
  console.log("Node app is running at http://localhost:" + app.get("port"));
});
