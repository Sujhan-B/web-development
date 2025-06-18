import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "our man getting equipped" },
  orderPlacedAt: { type: Date, default: Date.now },
  deliveryDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  deliveryTime: {
    type: String,
    required: true,
    default: '09:00' // Example default time
  },
  payment: { type: Boolean, default: false },
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
