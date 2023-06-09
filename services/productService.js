const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/errorApi");

const Product = require("../models/productModel");
const { json } = require("express");
//@desc get all products
//@route /api/v1/products
//@access public
exports.getProducts = asyncHandler(async (req, res) => {
  //1) filteration
  const queryStringObj = { ...req.query };
  const execluded = ["limit", "page", "sort", "fields"];
  execluded.forEach((field) => delete queryStringObj[field]);
  // filteration using operators{gte, gt, lte, lt}
  let queryString = JSON.stringify(queryStringObj);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  //2) pagination
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;
  //3) building mongoose query
  let mongooseQuery = Product.find(JSON.parse(queryString))
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  // sorting
  if (req.query.sort) {
    const sortString = req.query.sort.split(",").join(" ");
    mongooseQuery = mongooseQuery.sort(sortString);
  } else {
    mongooseQuery = mongooseQuery.sort("-createdAt");
  }
  // limit fields
  if (req.query.fields) {
    const fieldString = req.query.fields.split(",").join(" ");
    mongooseQuery = mongooseQuery.select(fieldString);
  } else {
    mongooseQuery = mongooseQuery.select("-__v");
  }
  // search
  if (req.query.keyword) {
    console.log(req.query.keyword);
    const query = {};
    query.$or = [
      { title: { $regex: req.query.keyword, $options: "i" } },
      { description: { $regex: req.query.keyword, $options: "i" } },
    ];
    mongooseQuery = mongooseQuery.find(query);
  }
  //4) executing mongoose query
  const products = await mongooseQuery;
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
