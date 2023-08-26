import { Router } from "express"
import prisma from "../../databse/prisma"

const router = Router()

//Get A User
router.get("/:id", async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.params.id,
        },
    })

    if (!user) {
        res.error("User not found", 404)
        return
    }

    res.success(user, "User found")
})

//Search User by username or name
router.get("/search/:query", async (req, res) => {
    const users = await prisma.user.findMany({
        where: {
            OR: [
                {
                    username: {
                        contains: req.params.query,
                    },
                },
                {
                    name: {
                        contains: req.params.query,
                    },
                },
            ],
        },
    })

    res.success(users)
})

//GET ALL Users
router.get("/", async (req, res) => {
    const users = await prisma.user.findMany()

    res.success(users)
})

export default router
