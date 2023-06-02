const express = require("express");
const router = express.Router();
const subCategoryRouter = require("./subCategoryRouter");
const brandRouter = require("./brandRouter");
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

router.use("/:categoryId/subcategories", subCategoryRouter);
router.use("/:categoryId/brands", brandRouter);

module.exports = router;
