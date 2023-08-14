export function formatResponse(
    status: string,
    message: string,
    data: any = null
) {
    return {
        status,
        message,
        data,
    }
}
