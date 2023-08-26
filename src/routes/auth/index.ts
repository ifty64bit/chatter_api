import { Router } from "express"
import {
    adjectives,
    animals,
    uniqueNamesGenerator,
} from "unique-names-generator"
import prisma from "../../databse/prisma"
import { firebaseAuth } from "../../utils/firebase"
import { validateLogin, validateSignup } from "./validator"

const router = Router()

//Normal signup
router.post("/signup", validateSignup, async (req, res) => {
    try {
        const username = uniqueNamesGenerator({
            dictionaries: [adjectives, animals],
            length: 2,
        })

        const firebaseUser = await firebaseAuth.createUser({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.username,
        })

        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                username,
                id: firebaseUser.uid,
            },
        })

        res.success(user, "User created successfully")
    } catch (error: any) {
        res.error(error.message, 500)
        return
    }
})

//Signup with outh
router.post("/signup/outh", async (req, res) => {
    const username = uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        length: 2,
    })
    const { email, id, avatar, displayName } = req.body
    const user = await prisma.user.create({
        data: {
            email,
            username,
            id,
            avatar,
            name: displayName,
        },
    })
    res.success(user, "User created successfully")
})

//Login
router.post("/login", validateLogin, async (req, res) => {
    try {
        const result = await firebaseAuth.generateSignInWithEmailLink(
            req.body.email,
            {
                url: "http://localhost:3000/login",
            }
        )
        console.log(result)
        res.success(result, "Email sent successfully")
    } catch (error: any) {
        res.error(error.message, 500)
    }
})

export default router
