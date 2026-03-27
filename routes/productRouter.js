import express from "express";

import {
  getProducts,
  getSingleProduct,
  addProduct,
  deleteProduct
} from "../Controllers/productControllers.js";

const router = express.Router();


// GET All Products
router.get("/", getProducts);


// GET Single Product (Product Details)
router.get("/:id", getSingleProduct);


// ADD Product
router.post("/", addProduct);


// DELETE Product
router.delete("/:id", deleteProduct);


export default router;