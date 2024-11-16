import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  bestseller: { type: Boolean },
});

const productModel =
  mongoose.model.product || mongoose.model("product", productSchema);

export default productModel;
