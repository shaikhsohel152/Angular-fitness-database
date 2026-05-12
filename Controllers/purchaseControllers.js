import Purchase from "../models/purchaseSchema.js";

// ================= GET ALL PURCHASES =================
export const getAllPurchase = async (req, res) => {
  try {
    const purchases = await Purchase.find();

    res.status(200).json({
      message: "Purchase Data Fetched",
      purchases
    });

  } catch (error) {
    res.status(500).json({
      message: "Error Fetching Purchase",
      error: error.message
    });
  }
};

// ================= ADD PURCHASE =================
export const postPurchase = async (req, res) => {
  try {
    const data = req.body;

    const newPurchase = await Purchase.create(data);

    res.status(201).json({
      message: "Purchase Added",
      purchase: newPurchase
    });

  } catch (error) {
    res.status(500).json({
      message: "Error Adding Purchase",
      error: error.message
    });
  }
};

// ================= UPDATE PURCHASE =================
export const updatePurchase = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedPurchase = await Purchase.findByIdAndUpdate(id, data, {
      new: true
    });

    if (!updatedPurchase) {
      return res.status(404).json({
        message: "Purchase not found"
      });
    }

    res.status(200).json({
      message: "Purchase Updated",
      purchase: updatedPurchase
    });

  } catch (error) {
    res.status(500).json({
      message: "Error Updating Purchase",
      error: error.message
    });
  }
};

// ================= DELETE PURCHASE =================
export const deletePurchase = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Purchase.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Purchase not found"
      });
    }

    res.status(200).json({
      message: "Purchase Deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error Deleting Purchase",
      error: error.message
    });
  }
};