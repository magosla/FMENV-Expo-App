const canLog = (process.env.EXPO_PUBLIC_APP_VARIANT === "development")

export const logger = {
    log: (...inputs: any[]): void => {
        if (canLog) console.log(...inputs)
    },
    warn: (...inputs: any[]): void => {
        if (canLog) console.warn(...inputs)
    },
    error: (...inputs: any[]): void => {
        if (canLog) console.error(...inputs)
    },
}