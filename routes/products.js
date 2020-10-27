const express = require("express");
const { protect } = require("../middlewares/auth");
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const router = express.Router({ mergeParams: true });

router.route("/").get(getProducts).post(protect, addProduct);
router
  .route("/:id")
  .get(getProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
