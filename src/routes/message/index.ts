import { Router } from "express"
import {
    createMessage,
    getAllRoomByUser,
    getMessagesByRoomId,
} from "../../controllers/messageController"
import prisma from "../../databse/prisma"

const router = Router()

//Get list of rooms of a user with last message
router.get("/", getAllRoomByUser)

//Get messages of a room
router.get("/:roomId", getMessagesByRoomId)

//Create a message
router.post("/", createMessage)

//Update a message
router.put("/:id", async (req, res) => {
    res.success("Not implemented yet")
})

//Delete a message
router.delete("/:id", async (req, res) => {
    res.success("Not implemented yet")
})

export default router

//Socket functions
export const sendMessage = async (payload: {
    userId: string
    roomId: number
    message: string
}) => {
    const { roomId, userId, message } = payload
    const createdMessage = await prisma.message.create({
        data: {
            text: message,
            roomId,
            userId,
        },
        include: {
            user: true,
            room: {
                select: {
                    Room_User: {
                        select: {
                            roomId: true,
                            user: {
                                select: {
                                    id: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    })

    return createdMessage
}
