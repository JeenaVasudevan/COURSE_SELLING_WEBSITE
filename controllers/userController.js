import { User } from "../models/userModel.js";
import bcrypt from "bcrypt"
import { generateToken } from "../utilities/token.js";

export const create = async (req, res, next) => {
  try {
    const { name, email, password, mobile, profilePic } = req.body;
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const UserAlreadyExist=await User.findOne({email})
    if(UserAlreadyExist){
        return res.status(400).json({error:"User already exist"})
    }
    const salt =await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt)
    const newUser=new User({name,email,password,mobile})
    const savedUser=await newUser.save()
    if(savedUser){
      const token=await generateToken(savedUser._id)
      console.log(token)
        return res.status(200).json({message:"User Registration Successfull",savedUser,token})
    }
    return res.status(400).json({error:"Something went wrong"})
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};
