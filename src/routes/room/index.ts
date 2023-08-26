import { Router } from "express"
import prisma from "../../databse/prisma"

const router = Router()

//Creaet a room
router.post("/", async (req, res) => {
    //Check if user have already created a room with the same participants
    const roomExists = await prisma.room.findFirst({
        where: {
            AND: [
                {
                    Room_User: {
                        some: {
                            userId: req?.user?.uid as string,
                        },
                    },
                },
                {
                    Room_User: {
                        some: {
                            userId: req.body.participants[0],
                        },
                    },
                },
            ],
        },
        include: {
            Room_User: {
                select: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            avatar: true,
                        },
                    },
                },
            },
        },
    })
    if (roomExists) {
        //return the existing room
        //After filter and format, delete Room_User from the object
        const existedRoomWithFormatedParticipants = {
            ...roomExists,
            participants: roomExists.Room_User.filter(
                (roomUser) => roomUser.user.id !== req.user?.uid
            ),
        }
        return res.success(existedRoomWithFormatedParticipants, "room_exists")
    }

    const room = await prisma.room.create({
        data: {
            name: req.body.name,
            createdBy: req?.user?.uid as string,
            Room_User: {
                create: [
                    {
                        userId: req?.user?.uid as string,
                    },
                    ...req.body.participants.map((participant: string) => ({
                        userId: participant,
                    })),
                ],
            },
        },
        include: {
            Room_User: {
                select: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            avatar: true,
                        },
                    },
                },
            },
        },
    })

    const newRoomWithFormatedParticipants = {
        ...room,
        participants: room.Room_User.filter(
            (roomUser) => roomUser.user.id !== req.user?.uid
        ),
    }

    res.success(newRoomWithFormatedParticipants, "Room Created Successfully")
})

//Get room list of a user
router.get("/user/", async (req, res) => {
    const rooms = await prisma.room.findMany({
        where: {
            Room_User: {
                some: {
                    userId: req.user?.uid as string,
                },
            },
        },
        include: {
            Room_User: {
                select: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            avatar: true,
                        },
                    },
                },
            },
        },
    })
    //After filter and format, delete Room_User from the object
    const roomsWithFormatedParticipants = rooms
        .map((room) => {
            return {
                ...room,
                participants: room.Room_User.filter(
                    (roomUser) => roomUser.user.id !== req.user?.uid
                ),
            }
        })
        .map((room) => {
            delete (room as any).Room_User
            return room
        })

    res.success(roomsWithFormatedParticipants, "Rooms Fetched Successfully")
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
                        equals: req.body.userId,
                    },
                },
            ],
        },
    })
    res.success(deletedRoom, "Room Deleted Successfully")
})

export default router
