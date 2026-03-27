import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

 id:{
  type:String
 },

 brand:{
  type:String,
  required:true
 },

 description:{
  type:String
 },

 category:{
  type:String
 },

 price:{
  type:String
 },

 discountPercentage:{
  type:String
 },

 rating:{
  type:String
 },

 bougth:{
  type:String
 },

 imgsrc:{
  type:String
 }

},{timestamps:true});


export default mongoose.model("Product",productSchema);