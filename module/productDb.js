import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  description: {
    type: String,
    required: [true, "The description is required"],
  },
  price: {
    type: Number,
    required: [true, "The price is required"],
  },
  image: {
    type: Array,
    required: [true, "The Image is required"],
  },
  sizes: {
    type: Array,
    required: [true, "The size is required"],
  },
  category: {
    type: String,
    required: [true, "The Category is required"],
  },
  subCategory: {
    type: String,
    required: [true, "The sub category is required"],
  },
  bestseller: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Number,
    default: Date.now(),
  },
});

const Product =
  mongoose.models.product || mongoose.model("Product", productSchema);

export default Product;
