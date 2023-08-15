import { Router } from "express"
import prisma from "../../databse/prisma"

const router = Router()

//Get messages of a room
router.get("/:roomId", async (req, res) => {
    const roomId = parseInt(req.params.roomId)
    const messages = await prisma.message.findMany({
        where: {
            roomId,
        },
        include: {
            user: true,
        },
    })

    res.success(messages)
})

//Create a message
router.post("/", async (req, res) => {
    const { roomId, userId, text } = req.body
    const message = await prisma.message.create({
        data: {
            text,
            roomId,
            userId,
        },
        include: {
            user: true,
        },
    })
    res.success(message)
})

//Update a message
router.put("/:id", async (req, res) => {
    res.success("Not implemented yet")
})

//Delete a message
router.delete("/:id", async (req, res) => {
    res.success("Not implemented yet")
})

export default router
