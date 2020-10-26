const ErrorResponse = require("../utils/errorResponse");
const Category = require("../models/Category");

/*
 * @desc Get all categories
 * @route
 * @access Public
 */
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res
      .status(200)
      .json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    next(error);
  }
};

/*
 * @desc Get all categories
 * @route
 * @access Public
 */
exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(
        new ErrorResponse(`Category with id of ${req.params.id} not found`, 404)
      );
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

/*
 * @desc Get all categories
 * @route
 * @access Private
 */
exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

/*
 * @desc Get all categories
 * @route
 * @access Private
 */
exports.updateCategory = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

/*
 * @desc Get all categories
 * @route
 * @access Private
 */
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return next(
        new ErrorResponse(`Category with id of ${req.params.id} not found`, 404)
      );
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
