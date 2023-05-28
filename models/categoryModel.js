const mongoose = require("mongoose");

const categoryScema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category required"],
      unique: [true, "category name must be unique"],
      minlength: [3, " too short category name"],
      maxlength: [32, "too long category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("category", categoryScema);

module.exports = CategoryModel;
