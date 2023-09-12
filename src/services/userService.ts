import prisma from "../databse/prisma"

export const userService = {
    getUserById: async (id: string) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            })
            return user
        } catch (error) {
            console.error(error)
            throw error
        }
    },
    searchUser: async (query: string, userId: string) => {
        try {
            const users = await prisma.user.findMany({
                where: {
                    OR: [
                        {
                            username: {
                                contains: query,
                            },
                        },
                        {
                            name: {
                                contains: query,
                            },
                        },
                    ],
                },
            })

            //remove current user from the list
            const filteredUsers = users.filter((user) => user.id !== userId)
            return filteredUsers
        } catch (error) {
            console.error(error)
            throw error
        }
    },
    getAllUsers: async () => {
        try {
            const users = await prisma.user.findMany()
            return users
        } catch (error) {
            console.error(error)
            throw error
        }
    },
}
