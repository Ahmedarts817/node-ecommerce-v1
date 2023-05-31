const express = require("express");
// merge params : letus access params from other routes
const router = express.Router({ mergeParams: true });
const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  editSubCategory,
  deleteSubCategory,
} = require("../services/subCategoryService");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  editSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/subCategoryValidation");

router
  .route("/")
  .post(createSubCategoryValidator, createSubCategory)
  .get(getSubCategories);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .post(editSubCategoryValidator, editSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;
