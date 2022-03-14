const router = require("express").Router();
const mongoose = require("mongoose");

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

// category Schema
const Category = new mongoose.model("Category", categorySchema);

// Post Category
router.post("/category", (req, res) => {
  const { category_name, category_added_date } = req.body;

  Category.findOne(
    {
      category_name: category_name,
      category_added_date: category_added_date,
    },
    (err, user) => {
      const Category11 = new Category({
        category_name,
        category_added_date,
      });
      Category11.save((err) => {
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

// Category get

router.get("/category", async (req, res) => {
  const getCategory = await Category.find({});
  res.send(getCategory);
});

module.exports = router;
