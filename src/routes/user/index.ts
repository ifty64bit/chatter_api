import { Router } from "express"
import {
    getAllUsers,
    getUserById,
    searchUser,
} from "../../controllers/userController"

const router = Router()

//Get A User
router.get("/:id", getUserById)

//Search User by username or name
router.get("/search/:query", searchUser)

//GET ALL Users
router.get("/", getAllUsers)

export default router
