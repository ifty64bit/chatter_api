import type { NextFunction, Request, Response } from "express"
import { z } from "zod"

export const validateSignup = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = z
        .object({
            email: z.string().email(),
            password: z.string().min(8).max(32),
            confirmPassword: z.string().min(8).max(32),
        })
        .superRefine(({ confirmPassword, password }, ctx) => {
            if (confirmPassword !== password) {
                ctx.addIssue({
                    code: "custom",
                    message: "The passwords did not match",
                    path: ["confirmPassword"],
                })
            }
        })

    try {
        schema.parse(req.body)
        next()
    } catch (error: any) {
        res.error(error, 403)
    }
}

export const validateLogin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(32),
    })

    try {
        schema.parse(req.body)
        next()
    } catch (error: any) {
        res.error(error, 403)
    }
}
