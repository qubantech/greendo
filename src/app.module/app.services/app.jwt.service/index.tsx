export function encryptPayload(payload: any): string {
    return JSON.stringify(payload)
}

export function decryptCode(code: string): any {
    return JSON.parse(code)
}