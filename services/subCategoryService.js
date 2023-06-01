const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/errorApi");
const SubCategory = require("../models/subcategoryModel");
const { selectFields } = require("express-validator/src/select-fields");
// set category id to body middleware
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};
//@desc create subcategories
//@route /api/v1/subcategories
//@access private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});
//Nested Route
//get sub Categories of one category middleware
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) {
    filterObject = { category: req.params.categoryId };
  }
  req.filterObject = filterObject;
  next();
};
//@desc get subcategories
//@route /api/v1/subcategories
//@access public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;

  const subcategories = await SubCategory.find(req.filterObject)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  res
    .status(201)
    .json({ results: subcategories.length, page, data: subcategories });
});
//@desc get subcategory
//@route /api/v1/subcategories/id
//@access public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategory.findById(id);
  if (!subcategory) {
    return next(new ApiError("no such subcategory", 404));
  }
  res.status(200).json({ data: subcategory });
});
//@desc edit subcategory
//@route /api/v1/subcategories/id
//@access private
exports.editSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subcategory = await SubCategory.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!subcategory) {
    return next(new ApiError("no such subcategory", 404));
  }
  res.status(200).json({ data: subcategory });
});
//@desc delete subcategory
//@route /api/v1/subcategories/id
//@access private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategory.findByIdAndDelete(id);
  if (!subcategory) {
    return next(new ApiError("no such subcategory ", 404));
  }
  res.status(200).json({ message: "done" });
});
