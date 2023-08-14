import bcrypt from "bcrypt"
import { Router } from "express"
import jwt from "jsonwebtoken"
import {
    adjectives,
    animals,
    uniqueNamesGenerator,
} from "unique-names-generator"
import config from "../../config"
import prisma from "../../databse/prisma"
import { validateLogin, validateSignup } from "./validator"

const router = Router()

//Normal signup
router.post("/signup", validateSignup, async (req, res) => {
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            password: await bcrypt.hash(
                req.body.password,
                parseInt(config().BCRYPT_SALT_ROUND as string)
            ),
            username: uniqueNamesGenerator({
                dictionaries: [adjectives, animals],
                length: 2,
            }),
        },
    })

    res.success(user, "User created successfully")
})

//Signup with outh
router.post("/signup/outh", async (req, res) => {
    res.send("Not implemented yet")
})

//Login
router.post("/login", validateLogin, async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email,
        },
    })

    if (!user) {
        res.error("User not found", 404)
        return
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password)

    if (!passwordMatch) {
        res.error("Password did not match", 403)
        return
    }

    //generate token
    const token = await jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
        },
        config().JWT_SECRET as string
    )

    res.success(
        {
            token,
        },
        "User logged in successfully"
    )
})

export default router
