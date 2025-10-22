import { Mentor } from "../models/mentorModel.js";
import bcrypt from "bcrypt"
import { generateToken } from "../utilities/token.js";

export const mentorSignup = async (req, res, next) => {
  try {
    const { name, email, password, mobile, profilePic } = req.body;
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const MentorAlreadyExist=await Mentor.findOne({email})
    if(MentorAlreadyExist){
        return res.status(400).json({error:"Mentor already exist"})
    }
    const salt =await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt)
    const newMentor=new Mentor({name,email,password:hashedPassword,mobile})
    const savedMentor=await newMentor.save()
    if(savedMentor){
      const token=await generateToken(savedMentor._id)
      res.cookie("token",token)
      console.log(token)
        return res.status(200).json({message:"Mentor Registration Successfull",savedMentor})
    }
    return res.status(400).json({error:"Something went wrong"})
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

export const mentorLogin=async(req,res,next)=>{
  try{
     const{email,password}=req.body
     if(!email||!password){
      return res.status(400).json({error:""})
     }
     const mentorExist=await Mentor.findOne({email})
     if(!mentorExist){
      return res.status(400).json({error:"mentor doesnot exist"})
     }
     const passwordMatch=await bcrypt.compare(password,mentorExist.password)
     if(!passwordMatch){
      return res.status(400).json({error:"Password does not match"})
     }
     const token=await generateToken(mentorExist._id)
     res.cookie("token",token)
     res.status(200).json({message:"Mentor login successfull"})
  }
  catch(error){
       console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
    
  }
}

export const mentorProfile=async(req,res,next)=>{
  try{
    const {mentor}=req
    const mentorData=await Mentor.findById(mentor.id).select('-password')
    res.json({success:true,message:"Mentor profile fetched",mentorData})
  }
   catch(error){
       console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
    
  }
}

export const mentorLogout=async(req,res,next)=>{
  try{
    res.clearCookie('token')
     res.json({success:true,message:"Mentor logged out"})
  }
  catch(error){
    console.log(error);
    res.status(error.statusCode||500).json(error.message)||'Internal Server Error'
  }
}
