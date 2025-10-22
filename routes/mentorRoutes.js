import express from "express"
import { mentorLogin, mentorSignup } from "../controllers/mentorController.js"
const router =express.Router()
router.post("/signup",mentorSignup)
router.post("/login",mentorLogin)
router.put("/profile-update",(req,res,next)=>{

})
router.get("/profile",(req,res,next)=>{

})
router.delete("/profile",(req,res,next)=>{

})
router.post("/logout",(req,res,next)=>{

})
router.get("/check-user",(req,res,next)=>{

})
export {router as mentorRoutes}