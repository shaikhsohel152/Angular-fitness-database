import Request from "../models/requestSchema.js";

// ================= GET MESSAGES =================
export const getMessage = async (req, res) => {
  try {
    const messages = await Request.find();

    res.status(200).json({
      message: "Messages fetched successfully",
      messages
    });

  } catch (error) {
    res.status(500).json({
      message: "Error while getting messages",
      error: error.message
    });
  }
};

// ================= POST MESSAGE =================
export const postMessage = async (req, res) => {
  try {
    const data = req.body;

    const newMessage = await Request.create(data);

    res.status(201).json({
      message: "Message received successfully",
      messageData: newMessage
    });

  } catch (error) {
    res.status(500).json({
      message: "Error while posting message",
      error: error.message
    });
  }
};