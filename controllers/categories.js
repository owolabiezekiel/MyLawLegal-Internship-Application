const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Category = require("../models/Category");

/*
 * @desc Get all categories
 * @route
 * @access Public
 */
exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().populate("products");
  res
    .status(200)
    .json({ success: true, count: categories.length, data: categories });
});

/*
 * @desc Get all categories
 * @route
 * @access Public
 */
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(
      new ErrorResponse(`Category with id of ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({ success: true, data: category });
});

/*
 * @desc Get all categories
 * @route
 * @access Private
 */
exports.createCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    data: category,
  });
});

/*
 * @desc Get all categories
 * @route
 * @access Private
 */
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(
      new ErrorResponse(`Category with id of ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: category });
});

/*
 * @desc Get all categories
 * @route
 * @access Private
 */
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(
      new ErrorResponse(`Category with id of ${req.params.id} not found`, 404)
    );
  }

  category.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});
