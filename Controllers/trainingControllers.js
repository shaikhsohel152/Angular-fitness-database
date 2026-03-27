import Training from "../models/trainingSchema.js";


export const getAllTraining = async (req, res) => {
    try {

        const response = await Training.find();

        res.json({
            message: "Training Data Fetched",
            response
        });

    } catch (error) {
        res.json({
            message: "Error Fetching Training",
            error
        });
    }
};


export const postTraining = async (req, res) => {
    try {

        const data = req.body;

        const response = await Training.create(data);

        res.json({
            message: "Training Added",
            response
        });

    } catch (error) {
        res.json({
            message: "Error Adding Training",
            error
        });
    }
};


export const updateTraining = async (req, res) => {
    try {

        const id = req.params.id;
        const data = req.body;

        const response = await Training.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

        res.json({
            message: "Training Updated",
            response
        });

    } catch (error) {
        res.json({
            message: "Error Updating Training",
            error
        });
    }
};


export const deleteTraining = async (req, res) => {
    try {

        const id = req.params.id;

        const response = await Training.findByIdAndDelete(id);

        res.json({
            message: "Training Deleted",
            response
        });

    } catch (error) {
        res.json({
            message: "Error Deleting Training",
            error
        });
    }
};