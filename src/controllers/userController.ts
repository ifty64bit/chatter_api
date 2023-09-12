import type { Request, Response } from "express"
import { userService } from "../services/userService"

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await userService.getUserById(id)
        res.success(user, "User found")
    } catch (error: any) {
        res.error("Something went wrong", 500)
    }
}

export const searchUser = async (req: Request, res: Response) => {
    try {
        const { query } = req.params
        const users = await userService.searchUser(
            query,
            req.user?.uid as string
        )
        res.success(users)
    } catch (error: any) {
        res.error("Something went wrong", 500)
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers()
        res.success(users)
    } catch (error: any) {
        res.error("Something went wrong", 500)
    }
}
