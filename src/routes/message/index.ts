import { Router } from "express"
import prisma from "../../databse/prisma"

const router = Router()

//Get list of rooms of a user with last message
router.get("/", async (req, res) => {
    const rooms = await prisma.room.findMany({
        where: {
            User: {
                some: {
                    id: req?.user?.id as string,
                },
            },
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "desc",
                },
                take: 1,
            },
        },
    })
    res.success(rooms)
})

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
    const { roomId, userId, message } = req.body
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
    res.success(createdMessage)
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
