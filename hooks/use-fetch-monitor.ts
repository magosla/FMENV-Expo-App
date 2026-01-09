import { getMonitors } from "@/services/monitor-service"
import { dateTime } from "@/utils/date-time"
import { logger } from "@/utils/logger"
import { observable, whenReady } from "@legendapp/state"
import { useValue } from "@legendapp/state/react"
import { DateTime } from "luxon"
import { useAppStore } from "./use-app-store"
import { useMonitorStore } from "./use-monitor-store"
import { useEffect } from "react"
import { NetworkError } from "@/types/error"

const isFetching$ = observable(false)
const error$ = observable<Error | undefined>(undefined)

let isLoading = false
let refetchInterval: number | undefined = undefined

export function useFetchMonitorsError() {
    const fetchError = useValue(() => error$.get())

    return { fetchError }
}

export function useFetchMonitors() {
    const { lastUpdatedAt, setMonitor } = useMonitorStore()
    const { config } = useAppStore()

    useEffect(() => {
        return () => clearTimeout(refetchInterval)
    }, [])

    const HOURS_BEFORE_REFETCH = 1

    function fetchData(override?: boolean) {

        if (isLoading) {
            return;
        }

        const { hours: hoursLastUpdated = 0 } = dateTime(lastUpdatedAt as DateTime)
            ?.diffNow("hours")?.toObject() || {}

        if (config === undefined || (lastUpdatedAt !== undefined
            && Math.abs(hoursLastUpdated) <= HOURS_BEFORE_REFETCH && !override)) {
            return
        }

        const urlTpl = config.endpoints.monitor;

        const [monitorReplacement] = urlTpl?.replacements ?? [];

        const url = urlTpl?.url_tpl.replace(monitorReplacement ?? '', '');

        isLoading = true;
        getMonitors(url, isFetching$, error$).then(d => setMonitor(d))
            .catch(e => {
                clearTimeout(refetchInterval)
                refetchInterval = setTimeout(fetchData, e instanceof NetworkError ? 2000 : 10000)
                logger.log('Error fetching monitors', e, typeof e,)
            })
            .finally(() => {
                isLoading = false
            })
    }

    whenReady(config, (v) => {
        if (!v?.endpoints) return
        fetchData()
    })

    return {
        isFetching: useValue(isFetching$),
        fetchFailed: useValue(() => !error$.get()),
        fetchData
    }
}