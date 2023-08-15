import dotenv from "dotenv"
import express from "express"
import morgan from "morgan"
import { checkLogin } from "./middleware/checkLogin"
import { extendedFormatedRequestResponse } from "./middleware/extendedFormatedRequestResponse"
import authRouter from "./routes/auth"
import roomRouter from "./routes/room"
import userRouter from "./routes/user"

const app = express()

dotenv.config()

app.use(express.json())
app.use(morgan("dev"))

//Register middleware
app.use(extendedFormatedRequestResponse)

//Register routes
app.use("/auth", authRouter)
app.use("/users", checkLogin, userRouter)
app.use("/rooms", roomRouter)

app.listen(3000, () => {
    console.log("Server running on port 3000")
})
