import { Router } from "express"
import {
    createRoom,
    deleteRoom,
    getAllRoomsByUser,
    getRoomById,
    updateRoomName,
} from "../../controllers/roomController"

const router = Router()

//Creaet a room
router.post("/", createRoom)

//Get room list of a user
router.get("/user/", getAllRoomsByUser)

//Get a room details
router.get("/:id", getRoomById)

//Update a room name
router.patch("/:id", updateRoomName)

//Delete a room only if the user is the creator
router.delete("/:id", deleteRoom)

export default router
