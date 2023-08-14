import dotenv from "dotenv"
import express from "express"
import userRouter from "./routes/UserRoute"

const app = express()

dotenv.config()

app.use(express.json())
app.use("/", userRouter)

app.listen(3000, () => {
    console.log("Server running on port 3000")
})
