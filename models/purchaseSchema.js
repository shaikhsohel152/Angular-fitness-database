import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({

    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    email: {
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },

    price: {
        type: Number
    },

    quantity: {
        type: Number
    },

    date: {
        type: String
    }

});

export default mongoose.model("Purchase", purchaseSchema);