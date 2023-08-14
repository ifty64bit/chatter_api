import { NextFunction, Request, Response } from "express"
import { formatResponse } from "../utils/formatResponse"

export function extendedFormatedRequestResponse(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.success = (data: any = null, message: string = "Success"): void => {
        const formattedResponse = formatResponse("success", message, data)
        res.status(200).json(formattedResponse)
    }

    res.error = (
        message: string = "An error occurred",
        status: number = 500
    ): void => {
        const formattedResponse = formatResponse("error", message)
        res.status(status).send(formattedResponse)
    }

    next()
}
