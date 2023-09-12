import { Router } from "express"
import { signUp, signUpWithOAuth } from "../../controllers/authController"
import { validateSignup } from "./validator"

const router = Router()

//Normal signup
router.post("/signup", validateSignup, signUp)

//Signup with outh
router.post("/signup/outh", signUpWithOAuth)

//Login is handled by firebase from client side

export default router
