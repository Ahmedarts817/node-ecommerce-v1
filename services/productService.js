const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/errorApi");

const Product = require("../models/productModel");
//@desc get all products
//@route /api/v1/products
//@access public
exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;
  const products = await Product.find().skip(skip).limit(limit);
  res.status(201).json({ results: products.length, page, data: products });
});

//@desc create products
//@route /api/v1/products
//@access private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

// @desc get specific product
// @route  /api/v1/products:id
//@access private
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ApiError(`no such categry of ${id}`), 404);
  }
  res.status(200).json({ data: product });
});

// @desc edit specific product
// @route  /api/v1/products:id
//@access private

exports.editProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) req.body.slug = slugify(req.body.title);
  const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`no such categry of ${id}`), 404);
  }
  res.status(200).json({ data: product });
});

// @desc delete specific product
// @route  /api/v1/products:id
//@access private

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiError(`no such categry of ${id}`), 404);
  }
  res.status(200).send("done");
});
