import type { Request, Response } from "express"
import { roomService } from "../services/roomService"

export const createRoom = async (req: Request, res: Response) => {
    try {
        const { name, userId, participants } = req.body as {
            name: string
            userId: string
            participants: Array<string>
        }
        const roomExist = await roomService.checkIfRoomExists(
            userId,
            participants[0]
        )

        if (roomExist) {
            return res.success(roomExist, "room_exists")
        }

        const room = await roomService.createRoom(name, userId, participants)

        return res.success(room, "room_created")
    } catch (error: any) {
        return res.error(error)
    }
}

export const getAllRoomsByUser = async (req: Request, res: Response) => {
    try {
        const rooms = await roomService.getAllRoomsByUser(
            req.user?.uid as string
        )
        return res.success(rooms, "rooms_fetched")
    } catch (error: any) {
        return res.error(error)
    }
}

export const getRoomById = async (req: Request, res: Response) => {
    try {
        const room = await roomService.getRoomById(
            req.params.id,
            req.user?.uid as string
        )
        return res.success(room, "room_fetched")
    } catch (error: any) {
        return res.error(error)
    }
}

export const updateRoomName = async (req: Request, res: Response) => {
    try {
        const { id: roomId, name } = req.body
        const updatedRoom = await roomService.updateRoomName(
            roomId,
            req.user?.uid as string,
            name
        )
        return res.success(updatedRoom, "room_updated")
    } catch (error: any) {
        return res.error(error)
    }
}

export const deleteRoom = async (req: Request, res: Response) => {
    try {
        const deletedRoom = await roomService.deleteRoom(
            req.params.id,
            req.user?.uid as string
        )
        return res.success(deletedRoom, "room_deleted")
    } catch (error: any) {
        return res.error(error)
    }
}
