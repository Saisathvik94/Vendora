import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserData",
    required: true
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductData",
        required: true
      },
      vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VendorData",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      priceAtPurchase: {
        type: Number,
        required: true
      }
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  payment: {
    method: {
      type: String,
      enum: ["COD", "Razorpay"],
      default: "COD"
    },
    paymentId: String,
    status: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending"
    }
  },

  status: {
    type: String,
    enum: ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  }
}, { timestamps: true });

const OrderData = mongoose.model("OrderData", orderSchema);

export default OrderData;