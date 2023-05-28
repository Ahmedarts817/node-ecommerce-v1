const { check } = require("express-validator");
const validationMiddleware = require("../middlewares/validationMiddleware");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("invalid mongo id"),
  validationMiddleware,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("category name required")
    .isLength({ min: 3 })
    .withMessage(" too short category name")
    .isLength({ max: 32 })
    .withMessage(" too long category name"),
  validationMiddleware,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("invalid mongo id"),
  validationMiddleware,
];
exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("invalid mongo id"),
  validationMiddleware,
];
