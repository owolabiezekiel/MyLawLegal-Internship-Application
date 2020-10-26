const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide category name"],
    unique: true,
    trim: true,
    maxlength: [50, "Category name has exceeded 50 characters"],
    minlength: [5, "Category name has less than 5 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
