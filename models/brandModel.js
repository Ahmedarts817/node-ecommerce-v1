const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "too short name "],
      maxlength: [32, "too long name "],
      unique: [true, "brand name must be unique"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "brand must belong to category"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
