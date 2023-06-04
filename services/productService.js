const Product = require("../models/productModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const apiError = require("../middlewares/globalError");

exports.createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    slug,
    description,
    quantity,
    sold,
    price,
    priceAfterDiscount,
    colors,
    imageCover,
    images,
    category,
    subcategory,
    brand,
    ratingAverage,
    ratingQuantity,
  } = req.body;
  const product = await Product.create(
    {
      title,
      slug: slugify(title),
      description,
      quantity,
      sold,
      price,
      priceAfterDiscount,
      colors,
      imageCover,
      images,
      category,
      subcategory,
      brand,
      ratingAverage,
      ratingQuantity,
    },
    { new: true }
  );
  res.status(201).json({ data: product });
});
