const mongoose = require("mongoose");
const slugify = require("slugify");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide category name"],
      unique: true,
      trim: true,
      maxlength: [50, "Category name has exceeded 50 characters"],
      minlength: [5, "Category name has less than 5 characters"],
    },
    slug: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CategorySchema.pre("save", function (next) {
  console.log("This ran before saving");
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

// Cascade delete products when a category is deleted
CategorySchema.pre("remove", async function (next) {
  await this.model("Product").deleteMany({ category: this._id });
  next();
});

//Reverse Populate with virtuals
CategorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
  justone: false,
});

module.exports = mongoose.model("Category", CategorySchema);
