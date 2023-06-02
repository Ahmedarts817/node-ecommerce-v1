const { check } = require("express-validator");
const validationMiddleware = require("../middlewares/validationMiddleware");

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand must be written")
    .isLength({ min: 3 })
    .withMessage("too short name")
    .isLength({ max: 32 })
    .withMessage("too long name"),
  check("category")
    .notEmpty()
    .withMessage("Brand must belong to a current category")
    .isMongoId()
    .withMessage("invalid mongo id"),
  validationMiddleware,
];

exports.getBrandValidator = [
  check("id")
    .notEmpty()
    .withMessage("Brand id must be written")
    .isMongoId()
    .withMessage("invalid mongo id"),
  validationMiddleware,
];
exports.editBrandValidator = [
  check("id")
    .notEmpty()
    .withMessage("Brand id must be written")
    .isMongoId()
    .withMessage("invalid mongo id"),
  validationMiddleware,
];
exports.deleteBrandValidator = [
  check("id")
    .notEmpty()
    .withMessage("Brand id must be written")
    .isMongoId()
    .withMessage("invalid mongo id"),
  validationMiddleware,
];
