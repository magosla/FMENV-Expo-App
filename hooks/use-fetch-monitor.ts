import { getMonitors } from "@/services/monitor-service"
import { NetworkError } from "@/types/error"
import { dateTime } from "@/utils/date-time"
import { logger } from "@/utils/logger"
import { observable, when } from "@legendapp/state"
import { useValue } from "@legendapp/state/react"
import { DateTime } from "luxon"
import { useEffect } from "react"
import { monitorStore$, monitorStoreSyncState$, setMonitors } from "@/stores/monitor"
import { appStore$, appStoreSyncState$ } from "@/stores/app"

const monitorsFetching$ = observable(false)
const monitorsFetchError$ = observable<Error | undefined>(undefined)

let isLoading = false
let refetchInterval: number | undefined = undefined

export function useMonitorsFetchError() {
    const fetchError = useValue(monitorsFetchError$)

    return { fetchError }
}

export function useMonitorsFetchState() {
    const isFetching = useValue(monitorsFetching$)

    return { isFetching }
}

type FetchDataOptions = { override?: boolean, retryOnError?: boolean } | undefined

async function fetchData(options?: FetchDataOptions)  {
    const { override, retryOnError } = options || { override: undefined, retryOnError: undefined }

    if (isLoading) {
        return;
    }
    isLoading = true;

    await when(appStoreSyncState$.isPersistLoaded)
    await when(monitorStoreSyncState$.isPersistLoaded)

    const lastUpdatedAt = monitorStore$.lastUpdatedAt.peek()

    const { hours: hoursLastUpdated = 0 } = dateTime(lastUpdatedAt as DateTime)
        ?.diffNow("hours")?.toObject() || {}

    const HOURS_BEFORE_REFETCH = Number.parseFloat(process.env.EXPO_PUBLIC_MONITORS_CACHE_HOURS ?? '1')
    const config = appStore$.config.peek()
    if (config?.endpoints === undefined || (lastUpdatedAt !== undefined
        && Math.abs(hoursLastUpdated) <= HOURS_BEFORE_REFETCH && !override)) {
        isLoading = false
        return
    }

    const urlTpl = config.endpoints.monitor;

    const [monitorReplacement] = urlTpl?.replacements ?? [];

    const url = urlTpl?.url_tpl.replace(monitorReplacement ?? '', '');

    getMonitors(url, monitorsFetching$, monitorsFetchError$).then(d => setMonitors(d))
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
}

export function useFetchMonitors() {
    logger.log('in useFetchMonitors ')

    useEffect(() => {
        return () => clearTimeout(refetchInterval)
    }, [])

    return {
        fetchData
    }
}