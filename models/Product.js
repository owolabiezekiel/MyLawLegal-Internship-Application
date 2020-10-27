const mongoose = require("mongoose");
const slugify = require("slugify");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide product name"],
    unique: true,
    trim: true,
    maxlength: [50, "Product name has exceeded 50 characters"],
    minlength: [5, "Product name has less than 5 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
  },
  inStock: Boolean,
  amountInStock: {
    type: Number,
    required: [true, "Please provide product name"],
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
});

ProductSchema.pre("save", function (next) {
  console.log("This ran before saving");
  this.inStock = this.amountInStock > 0 ? true : false;
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
