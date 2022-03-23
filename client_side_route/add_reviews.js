const router = require("express").Router();
const mongoose = require("mongoose");

const axios = require("axios");

const addReviewsSchema = new mongoose.Schema({
  review_title: {
    type: String,
  },
});

const AddReview = new mongoose.model("AddReview", addReviewsSchema);

router.post("/addreview", (req, res) => {
  const { review_title } = req.body;
  AddReview.findOne(
    {
      review_title: review_title,
    },
    (err, user) => {
      const Review11 = new AddReview({
        review_title,
      });
      product11.save((err) => {
        if (err) {
          res.send(err);
          console.log("rrr", res);
        } else {
          res.send({
            message: "Successfully Review Added",
          });
        }
      });
    }
  );
});
