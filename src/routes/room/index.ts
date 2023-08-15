import { Router } from "express"
import prisma from "../../databse/prisma"

const router = Router()

//Creaet a room
router.post("/", async (req, res) => {
    const room = await prisma.room.create({
        data: {
            name: req.body.name,
            createdBy: req.body.createdBy,
            Room_User: {
                create: [
                    {
                        userId: req.body.createdBy,
                    },
                    ...req.body.participants.map((participant: number) => ({
                        userId: participant,
                    })),
                ],
            },
        },
    })
    res.success(room, "Room Created Successfully")
})

//Get room list of a user
router.get("/user/:id", async (req, res) => {
    const rooms = await prisma.room.findMany({
        where: {
            Room_User: {
                some: {
                    userId: parseInt(req.params.id),
                },
            },
        },
        include: {
            Room_User: {
                include: {
                    user: true,
                },
            },
        },
    })
    res.success(rooms, "Rooms Fetched Successfully")
})

//Get a room details
router.get("/:id", async (req, res) => {
    const room = await prisma.room.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
        include: {
            Room_User: {
                include: {
                    user: true,
                },
            },
        },
    })
    res.success(room, "Room Fetched Successfully")
})

//Update a room name
router.patch("/:id", async (req, res) => {
    const updatedRoom = await prisma.room.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: {
            name: req.body.name,
        },
    })
    res.success(updatedRoom, "Room Updated Successfully")
})

//Delete a room only if the user is the creator
router.delete("/:id", async (req, res) => {
    const deletedRoom = await prisma.room.deleteMany({
        where: {
            AND: [
                {
                    id: {
                        equals: parseInt(req.params.id),
                    },
                },
                {
                    createdBy: {
                        equals: parseInt(req.body.userId),
                    },
                },
            ],
        },
    })
    res.success(deletedRoom, "Room Deleted Successfully")
})

export default router
