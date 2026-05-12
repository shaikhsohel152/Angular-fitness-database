import Training from "../models/trainingSchema.js";

// ================= GET ALL TRAINING =================
export const getAllTraining = async (req, res) => {
  try {
    const trainings = await Training.find();

    res.status(200).json({
      message: "Training Data Fetched",
      trainings
    });

  } catch (error) {
    res.status(500).json({
      message: "Error Fetching Training",
      error: error.message
    });
  }
};

// ================= ADD TRAINING =================
export const postTraining = async (req, res) => {
  try {
    const data = req.body;

    const newTraining = await Training.create(data);

    res.status(201).json({
      message: "Training Added",
      training: newTraining
    });

  } catch (error) {
    res.status(500).json({
      message: "Error Adding Training",
      error: error.message
    });
  }
};

// ================= UPDATE TRAINING =================
export const updateTraining = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedTraining = await Training.findByIdAndUpdate(id, data, {
      new: true
    });

    if (!updatedTraining) {
      return res.status(404).json({
        message: "Training not found"
      });
    }

    res.status(200).json({
      message: "Training Updated",
      training: updatedTraining
    });

  } catch (error) {
    res.status(500).json({
      message: "Error Updating Training",
      error: error.message
    });
  }
};

// ================= DELETE TRAINING =================
export const deleteTraining = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Training.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Training not found"
      });
    }

    res.status(200).json({
      message: "Training Deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error Deleting Training",
      error: error.message
    });
  }
};