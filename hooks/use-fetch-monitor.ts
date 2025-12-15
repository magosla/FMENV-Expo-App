import { getMonitors } from "@/services/monitor-service"
import { dateTime } from "@/utils/date-time"
import { observable, when } from "@legendapp/state"
import { useValue } from "@legendapp/state/react"
import { DateTime } from "luxon"
import { useAppStore } from "./use-app-store"
import { useMonitorStore } from "./use-monitor-store"
import { logError } from "@/utils/log-error"

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

    const fetchData = (override?: boolean) => {
        const { days: daysLastUpdated = 0 } = dateTime(lastUpdatedAt as DateTime)
            ?.diffNow("days")?.toObject() || {}

        if (config === undefined || (lastUpdatedAt !== undefined
            && daysLastUpdated <= 1 && !override)) {
            return
        }

        const urlTpl = config.endpoints.monitor;

        const [monitorReplacement] = urlTpl?.replacements ?? [];

        const url = urlTpl?.url_tpl.replace(monitorReplacement ?? '', '');

        getMonitors(url, isFetching$, error$).then(d => setMonitor(d)).catch(e => logError('Error fetching monitors', e))
    }

    when(() => config, () => { fetchData() })

    return {
        isFetching, fetchFailed, fetchData
    }
}