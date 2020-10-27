const express = require("express");

const {
  registerUser,
  login,
  getMe,
  updateMe,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middlewares/auth");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);
router.post("/forgotpassword", forgotPassword);
router.put("/updatepassword", protect, updatePassword);
router.put("/resetpassword/:resettoken", resetPassword);

module.exports = router;
