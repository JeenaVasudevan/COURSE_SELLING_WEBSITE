import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        role:{
            type:String,
            enum:["mentor","admin"],
            default:'Mentor',
        },
        password:{
            type:String,
            required:true,
        },
         profilePic:{
            type:String,
            default:"https://console.cloudinary.com/app/c-07fa3ba58b8429cf3e664d228bb34c/assets/media_library/search/asset/24be57faf1c6e50b1b6dc9970d65d37b/manage/summary?q=&view_mode=mosaic&context=manage",
        },
        qualification:{
            type:String,
        },
        courses:[{type:mongoose.Types.ObjectId,ref:"Course"}],
    },
    {timestamps:true}
);
export const Mentor=mongoose.model("Mentor",mentorSchema)