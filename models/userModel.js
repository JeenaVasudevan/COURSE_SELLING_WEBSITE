import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    maxLength:50,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    minLength:3,
    maxLength:30,
  },
  password:{
    type:String,
    required:true,
    minLength:6,
  },
  mobile:{
    type:String,
    required:true,
  },
  profilePic:{
    type:String,
    default:"https://console.cloudinary.com/app/c-07fa3ba58b8429cf3e664d228bb34c/assets/media_library/search/asset/24be57faf1c6e50b1b6dc9970d65d37b/manage/summary?q=&view_mode=mosaic&context=manage",
  },
},
{timestamps:true}
);
export const User=mongoose.model("User",userSchema)