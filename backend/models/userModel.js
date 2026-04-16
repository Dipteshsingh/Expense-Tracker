import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    trim:true
  },
  lastName:{
    type:String,
    required:true,
    trim:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true
  },
  password:{
    type:String,
    required:true,
    trim:true,
    select:false
  }
}, {timestamps:true})

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;