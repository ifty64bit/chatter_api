import type { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export async function checkLogin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        const user = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JWT_PAYLOAD

        req.user = user

        next()
    } else {
        res.error("You are not logged in", 403)
    }
}
