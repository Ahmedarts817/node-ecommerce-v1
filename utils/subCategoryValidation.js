const { check } = require("express-validator");
const validationMiddleware = require("../middlewares/validationMiddleware");

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("subcategory must be written")
    .isLength({ min: 3 })
    .withMessage("too short name")
    .isLength({ max: 32 })
    .withMessage("too long name"),
  check("category")
    .notEmpty()
    .withMessage("subcategory must belong to a current category")
    .isMongoId()
    .withMessage("invalid mongo id"),
  validationMiddleware,
];

exports.getSubCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("subcategory id must be written")
    .isMongoId()
    .withMessage("invalid mongo id"),
  validationMiddleware,
];
exports.editSubCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("subcategory id must be written")
    .isMongoId()
    .withMessage("invalid mongo id"),
  validationMiddleware,
];
exports.deleteSubCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("subcategory id must be written")
    .isMongoId()
    .withMessage("invalid mongo id"),
  validationMiddleware,
];
