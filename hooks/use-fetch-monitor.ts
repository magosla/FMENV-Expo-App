import { getMonitors } from "@/services/monitor-service"
import { dateTime } from "@/utils/date-time"
import { logger } from "@/utils/logger"
import { observable, when } from "@legendapp/state"
import { useValue } from "@legendapp/state/react"
import { DateTime } from "luxon"
import { useAppStore } from "./use-app-store"
import { useMonitorStore } from "./use-monitor-store"

const isFetching$ = observable(false)
const error$ = observable<Error | undefined>()


export function useFetchMonitorsError() {
    const fetchError = useValue(() => error$.get())

    return { fetchError }
}

export function useFetchMonitors() {
    const { lastUpdatedAt, setMonitor } = useMonitorStore()
    const { config } = useAppStore()

    const isFetching = useValue(isFetching$);
    const fetchFailed = useValue(() => !error$.get())
    const HOURS_BEFORE_REFETCH = 1

    const fetchData = (override?: boolean) => {
        if (isFetching$.get()) return

        const { hours: hoursLastUpdated = 0 } = dateTime(lastUpdatedAt as DateTime)
            ?.diffNow("hours")?.toObject() || {}

        if (config === undefined || (lastUpdatedAt !== undefined
            && Math.abs(hoursLastUpdated) <= HOURS_BEFORE_REFETCH && !override)) {
            return
        }

        const urlTpl = config.endpoints.monitor;

        const [monitorReplacement] = urlTpl?.replacements ?? [];

        const url = urlTpl?.url_tpl.replace(monitorReplacement ?? '', '');

        getMonitors(url, isFetching$, error$).then(d => setMonitor(d)).catch(e => logger.log('Error fetching monitors', e))
    }

    when(() => config, (v) => {
        if (v === undefined) return
        logger.log('useFetchMonitors ', v)
        fetchData()
    })

    return {
        isFetching, fetchFailed, fetchData
    }
}