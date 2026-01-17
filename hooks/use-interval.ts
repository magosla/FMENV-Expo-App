import { logger } from "@/utils/logger"
import { useEffect } from "react"

export function useInterval(handler: () => void, intervalInMs: number) {
    const intervalId = setInterval(handler, intervalInMs)

    useEffect(() => {
        return () => {
            clearInterval(intervalId)
            logger.log('clearInterval(interval) for', 'intervalId', intervalId, 'handler:', handler)
        }
    })
}