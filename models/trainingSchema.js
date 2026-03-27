import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    
    phone:{
        type: String,
        required: true

    },
    training:{
        type: String,
        required: true
    }
        
});

export default mongoose.model("Training", trainingSchema);