const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/errorApi");

const Category = require("../models/categoryModel");
//@desc get all categories
//@route /api/v1/categories
//@access public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;
  const categories = await Category.find().skip(skip).limit(limit);
  res.status(201).json({ results: categories.length, page, data: categories });
});

//@desc create categories
//@route /api/v1/categories
//@access private
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await Category.create({
    name,
    slug: slugify(name),
  });
  res.status(201).json({ data: category });
});

// @desc get specific category
// @route  /api/v1/categories:id
//@access private
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(`no such categry of ${id}`), 404);
  }
  res.status(200).json({ data: category });
});

// @desc edit specific category
// @route  /api/v1/categories:id
//@access private

exports.editCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(new ApiError(`no such categry of ${id}`), 404);
  }
  res.status(200).json({ data: category });
});

// @desc delete specific category
// @route  /api/v1/categories:id
//@access private

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiError(`no such categry of ${id}`), 404);
  }
  res.status(200).send();
});
