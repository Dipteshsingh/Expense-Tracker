import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true,
  },
  amount:{
    type:Number,
    required:true,
    min: [0, "Amount must be positive"]
  },
  category:{
    type:String,
    required:true,
    trim:true
  },
  description:{
    type:String,
    required:true,
    default: ""
  },
  date:{
    type:Date,
    required:true,
    default: Date.now
  }
}, {timestamps:true})

const expenseModel = mongoose.models.Expense || mongoose.model("Expense", expenseSchema);
export default expenseModel;