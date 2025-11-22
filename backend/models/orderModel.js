import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: String, required: true },
  fullName: { type: String, required: true },
  status: { type: String, default: "pending" },
});

const orderModel = mongoose.model.order || mongoose.model("order", orderSchema);

export default orderModel;
