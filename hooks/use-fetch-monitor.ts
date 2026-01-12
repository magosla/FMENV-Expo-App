import { getMonitors } from "@/services/monitor-service"
import { monitorStore$ } from "@/stores"
import { NetworkError } from "@/types/error"
import { dateTime } from "@/utils/date-time"
import { logger } from "@/utils/logger"
import { observable } from "@legendapp/state"
import { useValue } from "@legendapp/state/react"
import { DateTime } from "luxon"
import { useCallback, useEffect } from "react"
import { useAppStore } from "./use-app-store"
import { useMonitorStore } from "./use-monitor-store"

const isFetching$ = observable(false)
const error$ = observable<Error | undefined>(undefined)

let isLoading = false
let refetchInterval: number | undefined = undefined

export function useMonitorsFetchError() {
    const fetchError = useValue(error$)

    return { fetchError }
}

export function useMonitorsFetchState() {
    const isFetching = useValue(isFetching$)

    return { isFetching }
}

type FetchDataOptions = { override?: boolean, retryOnError?: boolean } | undefined

export function useFetchMonitors() {
    const { setMonitor } = useMonitorStore()
    const { config } = useAppStore()

    logger.log('in useFetchMonitors ')

    useEffect(() => {
        return () => clearTimeout(refetchInterval)
    }, [])

    const fetchData = useCallback((options?: FetchDataOptions) => {
        const { override, retryOnError } = options || { override: undefined, retryOnError: undefined }

        if (isLoading) {
            return;
        }

        const lastUpdatedAt = monitorStore$.lastUpdatedAt.peek()

        const { hours: hoursLastUpdated = 0 } = dateTime(lastUpdatedAt as DateTime)
            ?.diffNow("hours")?.toObject() || {}

        const HOURS_BEFORE_REFETCH = Number.parseFloat(process.env.EXPO_PUBLIC_MONITORS_CACHE_HOURS ?? '1')
        if (config?.endpoints === undefined || (lastUpdatedAt !== undefined
            && Math.abs(hoursLastUpdated) <= HOURS_BEFORE_REFETCH && !override)) {
            return
        }

        const urlTpl = config.endpoints.monitor;

        const [monitorReplacement] = urlTpl?.replacements ?? [];

        const url = urlTpl?.url_tpl.replace(monitorReplacement ?? '', '');

        isLoading = true;
        getMonitors(url, isFetching$, error$).then(d => setMonitor(d))
            .catch(e => {
                logger.log('Error fetching monitors', e, typeof e,)

                if (!retryOnError) return

                clearTimeout(refetchInterval)
                refetchInterval = setTimeout(() => fetchData({ retryOnError, override }),
                    (e instanceof NetworkError ?
                        Number.parseInt(process.env.EXPO_PUBLIC_NETWORK_RETRY_SECONDS ?? '4')
                        : Number.parseInt(process.env.EXPO_PUBLIC_FETCH_ERROR_RETRY_SECONDS ?? '20')) * 1000)
            })
            .finally(() => {
                isLoading = false
            })
    }, [config?.endpoints, setMonitor])

    return {
        fetchData
    }
}