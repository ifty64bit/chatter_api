import prisma from "../databse/prisma"

export const roomService = {
    checkIfRoomExists: async (userId: string, participantId: string) => {
        try {
            const roomExists = await prisma.room.findFirst({
                where: {
                    AND: [
                        {
                            Room_User: {
                                some: {
                                    userId,
                                },
                            },
                        },
                        {
                            Room_User: {
                                some: {
                                    userId: participantId,
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
                return {
                    ...roomExists,
                    participants: roomExists.Room_User.filter(
                        (roomUser) => roomUser.user.id !== userId
                    ),
                }
            }
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    createRoom: async (
        name: string,
        userId: string,
        participants: Array<string>
    ) => {
        try {
            const room = await prisma.room.create({
                data: {
                    name,
                    createdBy: userId,
                    Room_User: {
                        create: [
                            { userId },
                            ...participants.map((participant) => ({
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

            return {
                ...room,
                participants: room.Room_User.filter(
                    (roomUser) => roomUser.user.id !== userId
                ),
            }
        } catch (error) {
            console.error(error)
            throw error
        }
    },
    //Get all rooms of a user
    getAllRoomsByUser: async (userId: string) => { 
        try {
            const rooms = await prisma.room.findMany({
                where: {
                    Room_User: {
                        some: {
                            userId,
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

            return rooms.map((room) => ({
                ...room,
                participants: room.Room_User.filter(
                    (roomUser) => roomUser.user.id !== userId
                ),
            }))
        } catch (error) {
            console.error(error)
            throw error
        }
    },
    //Get room by id
    getRoomById: async (roomId: string, userId: string) => {
        try {
            const room = await prisma.room.findFirst({
                where: {
                    id: parseInt(roomId),
                    Room_User: {
                        some: {
                            userId,
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

            if (!room) {
                throw new Error("Room not found")
            }

            return {
                ...room,
                participants: room.Room_User.filter(
                    (roomUser) => roomUser.user.id !== userId
                ),
            }
        } catch (error) {
            console.error(error)
            throw error
        }
    },
    //Update room name
    updateRoomName: async (roomId: string, userId: string, name: string) => {
        try {
            const room = await prisma.room.findFirst({
                where: {
                    id: parseInt(roomId),
                    Room_User: {
                        some: {
                            userId,
                        },
                    },
                },
            })

            if (!room) {
                throw new Error("Room not found")
            }

            const updatedRoom = await prisma.room.update({
                where: {
                    id: parseInt(roomId),
                },
                data: {
                    name,
                },
            })

            return updatedRoom
        } catch (error) {
            console.error(error)
            throw error
        }
    },
    //Delete a room
    deleteRoom: async (roomId: string, userId: string) => {
        try {
            const room = await prisma.room.findFirst({
                where: {
                    id: parseInt(roomId),
                    Room_User: {
                        some: {
                            userId,
                        },
                    },
                },
            })

            if (!room) {
                throw new Error("Room not found")
            }

            const deletedRoom = await prisma.room.delete({
                where: {
                    id: parseInt(roomId),
                },
            })

            return deletedRoom
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}
