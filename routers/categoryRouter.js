const express = require("express");
const router = express.Router();
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/categoryValidation");
const {
  getCategories,
  createCategory,
  getCategory,
  editCategory,
  deleteCategory,
} = require("../services/categoryService");

router
  .route("/")
  .get(getCategories)
  .post(createCategoryValidator, createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, editCategory)
  .delete(deleteCategoryValidator, deleteCategory);
module.exports = router;
