const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../middlewares/validationMiddleware");
const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");
const { setCategoryIdToBody } = require("../services/subCategoryService");

exports.createProductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .notEmpty()
    .withMessage("Product required")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Too long description"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("To long price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),

  check("colors")
    .optional()
    .isArray()
    .withMessage("availableColors should be array of string"),
  check("imageCover").notEmpty().withMessage("Product imageCover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to a category")
    .isMongoId()
    .withMessage("Invalid ID formate")
<<<<<<< HEAD
    .custom((CategoryId) =>
      Category.findById(CategoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`no category for this id : ${CategoryId}`)
          );
        }
      })
    ),
=======
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(new Error(`no category of id: ${categoryId}`));
        }
      })
    ),

>>>>>>> 9017cd7a81a1d1d7f5d4f75e05be76cd566f831c
  check("subcategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((subcategoriesIds) =>
      SubCategory.find({ _id: { $exists: true, $in: subcategoriesIds } }).then(
<<<<<<< HEAD
        (result) => {
          if (result.lenght < 1 || result.length != subcategoriesIds.length) {
            return Promise.reject(new Error("invalid subcategories id"));
=======
        (subcategories) => {
          if (
            subcategories.length < 1 ||
            subcategories.length != subcategoriesIds.length
          ) {
            return Promise.reject(new Error("invalid subcategories"));
>>>>>>> 9017cd7a81a1d1d7f5d4f75e05be76cd566f831c
          }
        }
      )
    )
    .custom((val, { req }) =>
      SubCategory.find({ category: req.body.category }).then(
        (subcategories) => {
<<<<<<< HEAD
          const subcategoriesInDb = [];
          subcategories.forEach((subcategory) => {
            subcategoriesInDb.push(subcategory._id.toString());
          });
          const checker = (target, arr) => target.every((v) => arr.includes(v));
          if (!checker(val, subcategoriesInDb)) {
            return Promise.reject(
              new Error("subcategories not belong to category")
=======
          const subcategoriesIdsInDb = [];
          subcategories.forEach((subcategory) => {
            subcategoriesIdsInDb.push(subcategory._id.toString());
          });
          //chec subcategories ids are belong to category i n req.body
          const checker = (target, arr) => target.every((v) => arr.includes(v));
          if (!checker(val, subcategoriesIdsInDb)) {
            return Promise.reject(
              new Error(`subcategories not belong to category`)
>>>>>>> 9017cd7a81a1d1d7f5d4f75e05be76cd566f831c
            );
          }
        }
      )
    ),
  check("brand").optional().isMongoId().withMessage("Invalid ID formate"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingsQuantity must be a number"),

  validatorMiddleware,
];

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  body("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validatorMiddleware,
];
