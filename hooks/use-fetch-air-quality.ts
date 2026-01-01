import { getRecentAirQuality } from "@/services/air-quality-service";
import { dateTime } from "@/utils/date-time";
import { batch, observable, when, type Observable } from "@legendapp/state";
import { useValue } from "@legendapp/state/react";
import { useAirQualityStore } from "./use-air-quality-store";
import { useAppStore } from "./use-app-store";
import { useMonitorStore } from "./use-monitor-store";

const connection_failed$ = observable<Record<string, Error | undefined>>({})
const fetching_data$ = observable<Record<string, boolean>>({})

const is_loading: { [key: string]: boolean } = {};

function toValue<T>(value?: T | Observable<T>) {
    if (!value || typeof value == 'string') {
        return value
    }

    return ((value as Observable)?.get() || value) as T
}

export function useFetchAirQualityError(monitorId?: string | Observable<string>) {
    const fetchError = useValue(() => connection_failed$[toValue(monitorId) ?? ''].get())

    return { fetchError }
}

export function useFetchRecentAirQuality(monitorId?: string | Observable<string>, requireMonitor?: boolean) {
    const { addMonitor, setMonitor } = useMonitorStore()
    const { updateRecentAirQuality, setRecentAirQualities, recentAirQualities } = useAirQualityStore()
    const { config } = useAppStore()

    const isFetching = useValue(() => fetching_data$[toValue(monitorId) ?? ''].get() as boolean)
    const fetchFailed = useValue(() => connection_failed$[toValue(monitorId) ?? ''].get() !== undefined)
    const SECONDS_BEFORE_REFETCH = 30

    const fetchData = () => {
        const _monitorId = toValue(monitorId)
        if (config === undefined || (requireMonitor && _monitorId === undefined)) return
        const urlTpl = config?.endpoints.recent_air_quality;

        const [monitorReplacement] = urlTpl?.replacements ?? [];

        if (is_loading[_monitorId ?? '']) {
            return;
        }

        let currentItem = recentAirQualities?.[_monitorId ?? '']
        const { seconds: lastFetchedInSecs = undefined } = dateTime(currentItem?.fetchedAt)?.diffNow("seconds")?.toObject() || {}
        if (lastFetchedInSecs !== undefined && Math.abs(lastFetchedInSecs) < SECONDS_BEFORE_REFETCH) {
            return
        }

        is_loading[_monitorId ?? ''] = true

        const endpoint = urlTpl?.url_tpl.replace(monitorReplacement ?? '', _monitorId ?? '');

        getRecentAirQuality(
            endpoint,
            currentItem,
            fetching_data$[_monitorId ?? ''],
            connection_failed$[_monitorId ?? '']
        )
            ?.then(d => {
                if (!d || d.length === 0) return

                batch(() => {
                    if (_monitorId) {
                        if (d[0]?.monitor !== undefined) addMonitor(d[0]?.monitor)
                        if (d[0]?.airQuality !== undefined) updateRecentAirQuality(d[0])

                        return
                    }

                    setMonitor(d.map(i => i.monitor))
                    setRecentAirQualities(d)
                })

                // if (_monitorId) {
                //     if (d[0]?.monitor !== undefined) addMonitor(d[0]?.monitor)
                //     if (d[0]?.airQuality !== undefined) updateRecentAirQuality(d[0])

                //     return
                // }

                // setMonitor(d.map(i => i.monitor))
                // setRecentAirQualities(d)
            })?.catch((e) => {
                logger.log('Error fetching recent air quality:', e)
            })
            ?.finally(() => {
                delete is_loading[_monitorId ?? ''];
            })
    }

    when(
        () => config,
        (v) => {
            if (v === undefined) return
            fetchData()
        }
    )

    return { refreshData: fetchData, isFetching, fetchFailed }
}