import type { NextFunction, Request, Response } from "express"
import { firebaseAuth } from "../utils/firebase"

export async function checkLogin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const user = await firebaseAuth.verifyIdToken(token)
            req.user = user
            next()
        } catch (error: any) {
            console.log(error)
            res.error(error.message, 403)
        }
    } else {
        res.error("You are not logged in", 403)
    }
}
