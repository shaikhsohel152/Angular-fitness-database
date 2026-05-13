import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
    type: String
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String
  },

  password: {
    type: String,
    required: true
  },

  address: {
    type: String
  },

  // 🔥 ADD THIS
  city: {
    type: String
  },

  // 🔥 ADD THIS
  pincode: {
    type: String
  }

});

const User = mongoose.model("User", userSchema);

export default User;