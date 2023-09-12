import type { Request, Response } from "express"
import { messageService } from "../services/messageService"

export const getAllRoomByUser = async (req: Request, res: Response) => {
    try {
        const rooms = await messageService.getAllMessagesByRoomId(
            req.user?.uid as string
        )

        res.success(rooms)
    } catch (error) {
        res.error("Something went wrong", 500)
    }
}

export const getMessagesByRoomId = async (req: Request, res: Response) => {
    try {
        const roomId = parseInt(req.params.roomId)
        const messages = await messageService.getMessagesByRoomId(roomId)

        res.success(messages)
    } catch (error) {
        res.error("Something went wrong", 500)
    }
}

export const createMessage = async (req: Request, res: Response) => {
    try {
        const { roomId, userId, message } = req.body
        const createdMessage = await messageService.createMessage(
            roomId,
            userId,
            message
        )
        res.success(createdMessage)
    } catch (error) {
        res.error("Something went wrong", 500)
    }
}
