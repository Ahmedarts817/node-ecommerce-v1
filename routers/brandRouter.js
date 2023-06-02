const express = require("express");
// merge params : letus access params from other routes
const router = express.Router({ mergeParams: true });
const {
  createBrand,
  getBrands,
  getBrand,
  editBrand,
  deleteBrand,
  setCategoryIdToBody,
  createFilterObj,
} = require("../services/BrandService");
const {
  createBrandValidator,
  getBrandValidator,
  editBrandValidator,
  deleteBrandValidator,
} = require("../utils/BrandValidation");

router
  .route("/")
  .post(setCategoryIdToBody, createBrandValidator, createBrand)
  .get(createFilterObj, getBrands);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(editBrandValidator, editBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
