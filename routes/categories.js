const express = require("express");

const { protect } = require("../middlewares/auth");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");

// Bring in other resource routers
const productRouter = require("./products");

const router = express.Router();

// Re-route into other resource routers
router.use("/:categoryId/products", productRouter);

router.route("/").get(getCategories).post(protect, createCategory);
router
  .route("/:id")
  .get(getCategory)
  .put(protect, updateCategory)
  .delete(protect, deleteCategory);

module.exports = router;
