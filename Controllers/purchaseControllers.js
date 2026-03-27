import Purchase from "../models/purchaseSchema.js";


export const getAllPurchase = async (req, res) => {
    try {

        const response = await Purchase.find();

        res.json({
            message: "Purchase Data Fetched",
            response
        });

    } catch (error) {
        res.json({
            message: "Error Fetching Purchase",
            error
        });
    }
};


export const postPurchase = async (req, res) => {
    try {

        const data = req.body;

        const response = await Purchase.create(data);

        res.json({
            message: "Purchase Added",
            response
        });

    } catch (error) {
        res.json({
            message: "Error Adding Purchase",
            error
        });
    }
};


export const updatePurchase = async (req, res) => {
    try {

        const id = req.params.id;
        const data = req.body;

        const response = await Purchase.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

        res.json({
            message: "Purchase Updated",
            response
        });

    } catch (error) {
        res.json({
            message: "Error Updating Purchase",
            error
        });
    }
};


export const deletePurchase = async (req, res) => {
    try {

        const id = req.params.id;

        const response = await Purchase.findByIdAndDelete(id);

        res.json({
            message: "Purchase Deleted",
            response
        });

    } catch (error) {
        res.json({
            message: "Error Deleting Purchase",
            error
        });
    }
};