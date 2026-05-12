import Product from "../models/productSchema.js";

// ================= GET ALL PRODUCTS =================
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      message: "Products fetched successfully",
      products
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message
    });
  }
};

// ================= GET SINGLE PRODUCT =================
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching product",
      error: error.message
    });
  }
};

// ================= ADD PRODUCT =================
export const addProduct = async (req, res) => {
  try {
    const product = new Product({
      id: req.body.id,
      brand: req.body.brand,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      discountPercentage: req.body.discountPercentage,
      rating: req.body.rating,
      bought: req.body.bought,   // ✅ FIXED TYPO
      imgsrc: req.body.imgsrc
    });

    const savedProduct = await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct
    });

  } catch (error) {
    res.status(500).json({
      message: "Error adding product",
      error: error.message
    });
  }
};

// ================= DELETE PRODUCT =================
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: error.message
    });
  }
};