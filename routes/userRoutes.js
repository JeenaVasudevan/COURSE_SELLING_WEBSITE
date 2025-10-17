import express from "express"
import { create, login, userProfile } from "../controllers/userController.js"
const router =express.Router()
router.post("/signup",create)
router.post("/login",login)
router.put("/profile-update",(req,res,next)=>{

})
router.get("/profile/:id",userProfile)
router.delete("/profile",(req,res,next)=>{

})
router.post("/logout",(req,res,next)=>{

})
router.get("/check-user",(req,res,next)=>{

})
export {router as userRoutes}