/*
 * @desc Get all categories
 * @route
 * @access Public
 */
exports.getCategories = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all categories" });
};

/*
 * @desc Get all categories
 * @route
 * @access Public
 */
exports.getCategory = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Show category ${req.params.id}` });
};

/*
 * @desc Get all categories
 * @route
 * @access Private
 */
exports.createCategory = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Create new category" });
};

/*
 * @desc Get all categories
 * @route
 * @access Private
 */
exports.updateCategory = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update category ${req.params.id}` });
};

/*
 * @desc Get all categories
 * @route
 * @access Private
 */
exports.deleteCategory = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete category ${req.params.id}` });
};
