import { getRecentAirQuality, RecentData } from "@/services/air-quality-service";
import { appStore$, appStoreSyncState$ } from "@/stores/app";
import { addMonitor, setMonitors } from "@/stores/monitor";
import { airQualityStore$, airQualityStoreSyncState$, setRecentAirQualities, updateRecentAirQuality } from "@/stores/recent-air-quality";
import { dateTime } from "@/utils/date-time";
import { logger } from "@/utils/logger";
import { batch, observable, when, type Observable } from "@legendapp/state";
import { useValue } from "@legendapp/state/react";
import { useCallback } from "react";

const connection_failed$ = observable<Record<string, Error | undefined>>({})
const fetching_data$ = observable<Record<string, boolean>>({})

const is_loading: { [key: string]: boolean } = {};

function toValue<T>(value?: T | Observable<T>) {
    if (!value || typeof value == 'string') {
        return value
    }

    return ((value as Observable)?.peek() || value) as T
}

export function useAirQualityFetchError(monitorId?: string | Observable<string>) {
    const fetchError = useValue(connection_failed$[toValue(monitorId) ?? ''])

    return { fetchError }
}

export function useAirQualityFetchState(monitorId?: string | Observable<string>) {
    const isFetching = useValue(fetching_data$[toValue(monitorId) ?? ''])

    return { isFetching }
}

function handleResponse(data: RecentData, monitorId?: string) {
    if (!data || data.length === 0) return

    batch(() => {
        if (monitorId) {
            if (data[0]?.monitor !== undefined) addMonitor(data[0]?.monitor)

            if (data[0]?.airQuality !== undefined) updateRecentAirQuality(data[0])
            return
        }

        setMonitors(data.map(i => i.monitor))
        setRecentAirQualities(data)
    })
}

async function _fetchData(monitorId?: string, requireMonitor?: boolean) {

    if (is_loading[monitorId ?? '']) {
        return;
    }
    is_loading[monitorId ?? ''] = true


    await when(appStoreSyncState$.isPersistLoaded)
    await when(airQualityStoreSyncState$.isPersistLoaded)

    const config = appStore$.config.peek()

    if (config === undefined || (requireMonitor && monitorId === undefined)) {
        is_loading[monitorId ?? ''] = false
        return
    }
    const urlTpl = config?.endpoints.recent_air_quality;

    const [monitorReplacement] = urlTpl?.replacements ?? [];


    const recentAirQualities = airQualityStore$.recentAirQualities.peek()

    let currentItem = recentAirQualities?.[monitorId ?? '']

    const SECONDS_BEFORE_REFETCH = Number.parseInt(process.env.EXPO_PUBLIC_AIR_CACHE_SECONDS ?? '3')
    const { seconds: lastFetchedInSecs = undefined } = dateTime(currentItem?.fetchedAt)?.diffNow("seconds")?.toObject() || {}
    if (lastFetchedInSecs !== undefined && Math.abs(lastFetchedInSecs) < SECONDS_BEFORE_REFETCH) {
        is_loading[monitorId ?? ''] = false
        return
    }

    const endpoint = urlTpl?.url_tpl.replace(monitorReplacement ?? '', monitorId ?? '');

    getRecentAirQuality(
        endpoint,
        currentItem,
        fetching_data$[monitorId ?? ''],
        connection_failed$[monitorId ?? '']
    )
        ?.then(d => handleResponse(d, monitorId))?.catch((e) => {
            logger.log('Error fetching recent air quality:', e)
        })
        ?.finally(() => {
            delete is_loading[monitorId ?? ''];
        })
}

export function useFetchRecentAirQuality(monitorId?: string | Observable<string>, requireMonitor?: boolean) {
    const fetchData = useCallback(() => {
        const _monitorId = toValue(monitorId)
        _fetchData(_monitorId, requireMonitor)

    }, [monitorId, requireMonitor])

    return {
        refreshData: fetchData,
    }
}