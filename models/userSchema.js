import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: String,

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: String,

  password: String,

  address: String,
  city: String,
  pincode: String

}, { timestamps: true }); // 🔥 important

export default mongoose.model("User", userSchema);