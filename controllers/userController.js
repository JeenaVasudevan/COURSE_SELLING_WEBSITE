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
    const newUser=new User({name,email,password:hashedPassword,mobile})
    const savedUser=await newUser.save()
    if(savedUser){
      const token=await generateToken(savedUser._id)
      res.cookie("token",token)
      console.log(token)
        return res.status(200).json({message:"User Registration Successfull",savedUser})
    }
    return res.status(400).json({error:"Something went wrong"})
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

export const login=async(req,res,next)=>{
  try{
     const{email,password}=req.body
     if(!email||!password){
      return res.status(400).json({error:""})
     }
     const userExist=await User.findOne({email})
     if(!userExist){
      return res.status(400).json({error:"user doesnot exist"})
     }
     const passwordMatch=await bcrypt.compare(password,userExist.password)
     if(!passwordMatch){
      return res.status(400).json({error:"Password does not match"})
     }
     const token=await generateToken(userExist._id)
     res.cookie("token",token)
     res.status(200).json({message:"Login Success"})
  }
  catch(error){
       console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
    
  }
}

export const userProfile=async(req,res,next)=>{
  try{
    const {id}=req.params
    const userData=await User.findById(id).select('-password')
    res.json({success:true,message:"User profile fetched",userData})
  }
   catch(error){
       console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
    
  }
}
