import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import { createServer } from "http"
import morgan from "morgan"
import { Server } from "socket.io"
import { checkLogin } from "./middleware/checkLogin"
import { extendedFormatedRequestResponse } from "./middleware/extendedFormatedRequestResponse"
import authRouter from "./routes/auth"
import messageRouter, { sendMessage } from "./routes/message"
import roomRouter from "./routes/room"
import userRouter from "./routes/user"
import { firebaseAuth } from "./utils/firebase"

const PORT = process.env.PORT || 3001

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
    },
})

dotenv.config()

app.use(express.json())
app.use(morgan("dev"))
app.use(
    cors({
        origin: "*",
    })
)

//Register middleware
app.use(extendedFormatedRequestResponse)

//Register routes
app.use("/auth", authRouter)
app.use("/users", checkLogin, userRouter)
app.use("/rooms", checkLogin, roomRouter)
app.use("/messages", checkLogin, messageRouter)

//Register socket.io
io.on("connection", async (socket) => {
    const isVarified = await firebaseAuth.verifyIdToken(
        socket.handshake.auth.token as string
    )
    if (!isVarified) {
        socket.disconnect()
        return
    }
    //Join Client their own room based on firebase UID
    socket.join(isVarified.uid)
    //Register Socket Functions
    socket.on("join_room", (roomId) => {
        socket.join(roomId)
    })
    socket.on("leave_room", (roomId) => {
        socket.leave(roomId)
    })
    socket.on("create:message", async (payload) => {
        const newMessage = await sendMessage(payload)
        const receiver = newMessage.room.Room_User.filter(
            (user) => user.user.id !== newMessage.user.id
        )[0].user.id

        console.log(`Emitting message to: "message:${receiver}"`)
        socket.to(receiver).emit(`message:${receiver}`, newMessage)
        socket.emit(`message:${newMessage.user.id}`, newMessage)
    })

    console.log(io.engine.clientsCount)
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
