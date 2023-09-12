import prisma from "../databse/prisma"

export const messageService = {
    getAllMessagesByRoomId: async (userId: string) => {
        try {
            const messages = await prisma.room.findMany({
                where: {
                    User: {
                        some: {
                            id: userId,
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
            return messages
        } catch (error: any) {
            console.error(error)
            throw new Error(error)
        }
    },

    getMessagesByRoomId: async (roomId: number) => {
        try {
            const messages = await prisma.message.findMany({
                where: {
                    roomId,
                },
                include: {
                    user: true,
                },
            })
            return messages
        } catch (error: any) {
            console.error(error)
            throw new Error(error)
        }
    },

    createMessage: async (roomId: number, userId: string, message: string) => {
        try {
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
        } catch (error: any) {
            console.error(error)
            throw new Error(error)
        }
    },
}
