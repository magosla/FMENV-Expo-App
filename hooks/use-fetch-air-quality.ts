import { getRecentAirQuality, RecentData } from "@/services/air-quality-service";
import { airQualityStore$, appStore$ } from "@/stores";
import { dateTime } from "@/utils/date-time";
import { logger } from "@/utils/logger";
import { batch, observable, type Observable } from "@legendapp/state";
import { useValue } from "@legendapp/state/react";
import { useCallback } from "react";
import { useAirQualityStore } from "./use-air-quality-store";
import { useMonitorStore } from "./use-monitor-store";

const connection_failed$ = observable<Record<string, Error | undefined>>({})
const fetching_data$ = observable<Record<string, boolean>>({})

const is_loading: { [key: string]: boolean } = {};

function toValue<T>(value?: T | Observable<T>) {
    if (!value || typeof value == 'string') {
        return value
    }

    return ((value as Observable)?.peek() || value) as T
}

export function useFetchAirQualityError(monitorId?: string | Observable<string>) {
    const fetchError = useValue(() => connection_failed$[toValue(monitorId) ?? ''].get())

    return { fetchError }
}

export function useFetchRecentAirQuality(monitorId?: string | Observable<string>, requireMonitor?: boolean) {
    const { addMonitor, setMonitor } = useMonitorStore()
    const { updateRecentAirQuality, setRecentAirQualities } = useAirQualityStore()

    const handleResponse = useCallback((data: RecentData, monitorId?: string) => {
        if (!data || data.length === 0) return

        batch(() => {
            if (monitorId) {
                if (data[0]?.monitor !== undefined) addMonitor(data[0]?.monitor)
                if (data[0]?.airQuality !== undefined) updateRecentAirQuality(data[0])

                return
            }

            setMonitor(data.map(i => i.monitor))
            setRecentAirQualities(data)
        })
    }, [addMonitor, setMonitor, setRecentAirQualities, updateRecentAirQuality])

    const fetchData = useCallback(() => {
        const _monitorId = toValue(monitorId)
        const config = appStore$.config.peek()

        if (config === undefined || (requireMonitor && _monitorId === undefined)) return
        const urlTpl = config?.endpoints.recent_air_quality;

        const [monitorReplacement] = urlTpl?.replacements ?? [];

        if (is_loading[_monitorId ?? '']) {
            return;
        }

        const recentAirQualities = airQualityStore$.recentAirQualities.peek()

        let currentItem = recentAirQualities?.[_monitorId ?? '']

        const SECONDS_BEFORE_REFETCH = Number.parseInt(process.env.EXPO_PUBLIC_AIR_CACHE_SECONDS ?? '3')
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
            ?.then(d => handleResponse(d, _monitorId))?.catch((e) => {
                logger.log('Error fetching recent air quality:', e)
            })
            ?.finally(() => {
                delete is_loading[_monitorId ?? ''];
            })
    }, [handleResponse, monitorId, requireMonitor])

    return {
        refreshData: fetchData,
        isFetching: useValue(fetching_data$[toValue(monitorId) ?? '']),
        fetchFailed: useValue(() => connection_failed$[toValue(monitorId) ?? ''].get() !== undefined)
    }
}