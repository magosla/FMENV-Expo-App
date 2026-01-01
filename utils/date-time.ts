import { DateTime } from "luxon";

export function dateTime(dateTime?: string | DateTime): DateTime | undefined {
    if (typeof dateTime === 'string') {
        return (dateTime.length > 4) ? DateTime.fromISO(dateTime) : undefined
    }

    return dateTime
}