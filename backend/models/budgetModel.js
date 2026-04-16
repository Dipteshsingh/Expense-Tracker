import mongoose from "mongoose";

const budgetSchema = mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true,
  },
  limit:{
    type:Number,
    required:true,
    min: [0, "Amount must be positive"]
  },
  category:{
    type:String,
    required:true,
    trim:true
  },
  month:{
    type:String,
    required:true,
  },

}, {timestamps:true})

const budgetModel = mongoose.models.Budget || mongoose.model("Budget", budgetSchema);
export default budgetModel;