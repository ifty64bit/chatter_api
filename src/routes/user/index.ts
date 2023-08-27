import { Router } from "express"
import prisma from "../../databse/prisma"

const router = Router()

//Get A User
router.get("/:id", async (req, res) => {
    try {
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
    } catch (error) {
        res.error("Something went wrong", 500)
    }
})

//Search User by username or name
router.get("/search/:query", async (req, res) => {
    try {
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
    } catch (error) {
        res.error("Something went wrong", 500)
    }
})

//GET ALL Users
router.get("/", async (req, res) => {
    try {
        const users = await prisma.user.findMany()

        res.success(users)
    } catch (error) {
        res.error("Something went wrong", 500)
    }
})

export default router
