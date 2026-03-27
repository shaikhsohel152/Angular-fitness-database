import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  phone: String,
  address: String
});

const Login = mongoose.model("Login", loginSchema);

export default Login;