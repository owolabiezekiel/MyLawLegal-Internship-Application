const express = require("express");
const { protect, authorize } = require("../middlewares/auth");
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(protect, getProducts)
  .post(protect, authorize("admin"), addProduct);
router
  .route("/:id")
  .get(protect, getProduct)
  .put(protect, authorize("admin"), updateProduct)
  .delete(protect, authorize("admin"), deleteProduct);

module.exports = router;
