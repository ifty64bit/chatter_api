import type { Request, Response } from "express"
import { authService } from "../services/authService"

export const signUp = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body as {
            email: string
            password: string
            username: string
        }

        const user = await authService.signUp(email, password, username)
        res.success(user, "User created successfully")
    } catch (error: any) {
        res.error(error.message, 500)
    }
}

export const signUpWithOAuth = async (req: Request, res: Response) => { 
    try {
        const { email, id, avatar, displayName } = req.body as {
            email: string
            id: string
            avatar: string
            displayName: string
        }

        const user = await authService.signUpWithOAuth({
            email,
            id,
            avatar,
            displayName,
        })
        res.success(user, "User created successfully")
    } catch (error: any) {
        res.error(error.message, 500)
    }
}
