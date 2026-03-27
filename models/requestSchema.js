import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    name:{
       type: String,
       required: true
    },
    email:{
        type:String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
})

export default mongoose.model("Request",requestSchema)
    
