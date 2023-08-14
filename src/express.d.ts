declare namespace Express {
    export interface Request {
        user?: JWT_PAYLOAD
    }
    export interface Response {
        success(data?: any, message?: string): void
        error(message?: string, status?: number): void
    }
}

type JWT_PAYLOAD = {
    id: number
    email: string
    username: string
    iat: number
}
