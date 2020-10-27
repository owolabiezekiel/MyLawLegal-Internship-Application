const express = require("express");

const { protect, authorize } = require("../middlewares/auth");
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

router
  .route("/")
  .get(protect, getCategories)
  .post(protect, authorize("admin"), createCategory);
router
  .route("/:id")
  .get(protect, getCategory)
  .put(protect, authorize("admin"), updateCategory)
  .delete(protect, authorize("admin"), deleteCategory);

module.exports = router;
