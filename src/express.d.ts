import { DecodedIdToken } from "firebase-admin/auth"

declare global {
    namespace Express {
        export interface Request {
            user?: DecodedIdToken
        }
        export interface Response {
            success(data?: any, message?: string): void
            error(message?: string, status?: number): void
        }
    }
}
