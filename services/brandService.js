const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/errorApi");
const Brand = require("../models/brandModel");
const { selectFields } = require("express-validator/src/select-fields");
// set category id to body middleware
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};
//@desc create brands
//@route /api/v1/brands
//@access private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const brand = await Brand.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: brand });
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
//@desc get brands
//@route /api/v1/brands
//@access public
exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;

  const brands = await Brand.find(req.filterObject)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  res.status(201).json({ results: brands.length, page, data: brands });
});
//@desc get brand
//@route /api/v1/brands/id
//@access public
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new ApiError("no such brand", 404));
  }
  res.status(200).json({ data: brand });
});
//@desc edit brand
//@route /api/v1/brands/id
//@access private
exports.editBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const brand = await Brand.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!brand) {
    return next(new ApiError("no such brand", 404));
  }
  res.status(200).json({ data: brand });
});
//@desc delete brand
//@route /api/v1/brands/id
//@access private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiError("no such brand ", 404));
  }
  res.status(200).json({ message: "done" });
});
