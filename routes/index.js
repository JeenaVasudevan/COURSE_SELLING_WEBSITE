import express from "express"
import { userRoutes } from "./userRoutes.js"
import { mentorRoutes } from "./mentorRoutes.js"

const router =express.Router()
router.use('/user',userRoutes)
router.use('/mentor',mentorRoutes)

export {router as apiRouter}