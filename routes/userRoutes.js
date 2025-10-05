import express from "express"
import { create } from "../controllers/userController.js"
const router =express.Router()
router.post("/signup",create)
router.post("/login",(req,res,next)=>{

})
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
export {router as userRoutes}