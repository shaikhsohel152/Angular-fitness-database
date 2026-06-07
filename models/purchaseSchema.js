import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({

  // User Reference
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  email: {
    type: String,
    required: true
  },

  brand: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  // Payment Details
  paymentMode: {
    type: String,
    required: true
  },

  upiApp: {
    type: String,
    default: ""
  },

  paymentStatus: {
    type: String,
    default: "Paid"
  },

  // Order Status
  orderStatus: {
    type: String,
    default: "Pending"
  },

  // Delivery Details
  address: {
    type: String
  },

  image: {
    type: String
  },

  date: {
    type: String
  }

}, {
  timestamps: true
});

export default mongoose.model("Purchase", purchaseSchema);