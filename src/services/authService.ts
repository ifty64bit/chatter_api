import {
    adjectives,
    animals,
    uniqueNamesGenerator,
} from "unique-names-generator"
import prisma from "../databse/prisma"
import { firebaseAuth } from "../utils/firebase"

export const authService = {
    signUp: async (email: string, password: string, username: string) => {
        try {
            const uniqe_username = uniqueNamesGenerator({
                dictionaries: [adjectives, animals],
                length: 2,
            })

            const firebaseUser = await firebaseAuth.createUser({
                email: email,
                password: password,
                displayName: username,
            })

            const user = await prisma.user.create({
                data: {
                    email,
                    username: uniqe_username,
                    id: firebaseUser.uid,
                },
            })
            return user
        } catch (error) {
            console.error(error)
            throw error
        }
    },
    signUpWithOAuth: async ({
        email,
        id,
        avatar,
        displayName,
    }: {
        email: string
        id: string
        avatar: string
        displayName: string
    }) => {
        try {
            // Create a unique username
            const generatedUsername = uniqueNamesGenerator({
                dictionaries: [adjectives, animals],
                length: 2,
            })

            // Create a user in your database
            const user = await prisma.user.create({
                data: {
                    email,
                    username: generatedUsername,
                    id,
                    avatar,
                    name: displayName,
                },
            })

            return user
        } catch (error) {
            console.error(error)
            throw error
        }
    },
}
