import Product from "../models/productSchema.js";


// ✅ GET ALL PRODUCTS

export const getProducts = async (req, res) => {

    try {

        const products = await Product.find();

        res.json(products);

    }
    catch (error) {

        res.status(500).json({ message: error.message })

    }

};



// ✅ GET SINGLE PRODUCT (Product Details)

export const getSingleProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        res.json(product);

    }
    catch (error) {

        res.status(500).json({ message: error.message })

    }

};



// ✅ ADD PRODUCT

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
            bougth: req.body.bougth,
            imgsrc: req.body.imgsrc

        });

        await product.save();

        res.json(product);

    }
    catch (error) {

        res.status(500).json({ message: error.message })

    }

};



// ✅ DELETE PRODUCT

export const deleteProduct = async (req, res) => {

    try {

        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: "Product Deleted" })

    }
    catch (error) {

        res.status(500).json({ message: error.message })

    }

};