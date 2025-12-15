export function logError(...inputs: any[]): void {
    if (process.env.EXPO_PUBLIC_APP_VARIANT === "development") {
        console.log(...inputs)
    }
}