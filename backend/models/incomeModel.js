import mongoose from "mongoose";

const incomeSchema = mongoose.Schema({
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
  source:{
    type:String,
    required:true,
    trim:true
  },
  frequency:{
    type:String,
    enum: ["One-time", "Weekly", "Monthly", "Yearly"],
    default: "Monthly"
  },
  date:{
    type:Date,
    required:true,
    default: Date.now
  }
}, {timestamps:true})

const incomeModel = mongoose.models.Income || mongoose.model("Income", incomeSchema);
export default incomeModel;