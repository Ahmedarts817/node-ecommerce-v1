const express = require("express");
const router = express.Router({ mergeParams: true });
const { createProduct } = require("../services/productService");

module.exports = router;
