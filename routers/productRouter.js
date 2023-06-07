const express = require("express");
const router = express.Router();
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/productValidation");
const {
  getProducts,
  createProduct,
  getProduct,
  editProduct,
  deleteProduct,
} = require("../services/productService");

router.route("/").get(getProducts).post(createProductValidator, createProduct);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, editProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
