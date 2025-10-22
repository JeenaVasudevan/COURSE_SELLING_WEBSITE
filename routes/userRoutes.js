import express from "express"
import { login,userDelete,userLogout, userProfile, userSignup } from "../controllers/userController.js"
import { authUser } from "../middleware/authUser.js"
const router =express.Router()
router.post("/signup",userSignup)
router.post("/login",login)
router.put("/profile-update",authUser,)
router.get("/profile/:id",authUser,userProfile)
router.delete("/delete/:id",authUser,userDelete)
router.post("/logout",userLogout)
router.get("/check-user",(req,res,next)=>{

})
export {router as userRoutes}