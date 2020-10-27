const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Product = require("../models/Product");
const Category = require("../models/Category");

/*
 * @desc Get all categories
 * @route
 * @access Public
 */
exports.getProducts = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.categoryId) {
    query = Product.find({ category: req.params.categoryId }).populate({
      path: "category",
      select: "name slug",
    });
  } else {
    query = Product.find().populate({
      path: "category",
      select: "name slug",
    });
  }
  const products = await query;
  res
    .status(200)
    .json({ success: true, count: products.length, data: products });
});

/*
 * @desc Get all categories
 * @route
 * @access Public
 */
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate({
    path: "category",
    select: "name slug",
  });
  if (!product) {
    return next(
      new ErrorResponse(`Category with id of ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({ success: true, data: product });
});

/*
 * @desc Get all categories
 * @route
 * @access Private
 */
exports.addProduct = asyncHandler(async (req, res, next) => {
  req.body.category = req.params.categoryId;

  const category = await Category.findById(req.params.categoryId);

  if (!category) {
    return next(
      new ErrorResponse(
        `Category with id of ${req.params.categoryId} not found`,
        404
      )
    );
  }

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
});

/*
 * @desc Get all categories
 * @route
 * @access Private
 */
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product with id of ${req.params.id} not found`, 404)
    );
  }

  if (req.body.amountInStock && req.body.amountInStock > 0) {
    console.log(req.body.amountInStock);
    req.body.inStock = true;
  }
  if (req.body.amountInStock && req.body.amountInStock <= 0) {
    console.log(req.body.amountInStock);
    req.body.inStock = false;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: product });
});

/*
 * @desc Get all categories
 * @route
 * @access Private
 */
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorResponse(`Product with id of ${req.params.id} not found`, 404)
    );
  }

  await product.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
