import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns/promises";
import cors from "cors";

import userRouter from "./routes/userRouter.js";
import trainingRouter from "./routes/trainingRouter.js";
import purchaseRouter from "./routes/purchaseRouter.js";
import productRouter from "./routes/productRouter.js";
import loginRouter from "./routes/loginRouter.js";
import requestRouter from "./routes/requestRouter.js";

dotenv.config();

// DNS Fix
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const port = process.env.PORT || 5000;

// ================= MIDDLEWARE =================

app.use(cors({
  origin: [
    "http://localhost:4200",
    "https://gymgearpro.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ================= MONGODB CONNECTION =================

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.log("❌ MongoDB Error:", err);
});

// ================= ROUTES =================

app.use("/users", userRouter);
app.use("/training", trainingRouter);
app.use("/purchase", purchaseRouter);
app.use("/products", productRouter);
app.use("/api", loginRouter);
app.use("/request", requestRouter);

// ================= TEST ROUTE =================

app.get("/", (req, res) => {
  res.send("✅ API Running Successfully");
});

// ================= SERVER START =================

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});