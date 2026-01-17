import { getConfig } from "@/services/config-service";
import { appStore$, appStoreSyncState$, updateConfig } from "@/stores/app";
import { NetworkError } from "@/types/error";
import { dateTime } from "@/utils/date-time";
import { logger } from "@/utils/logger";
import { observable, when } from "@legendapp/state";
import { useValue } from "@legendapp/state/react";
import { DateTime } from "luxon";

export const configFetching$ = observable(false)
export const configFetchError$ = observable<Error | undefined>()

let isLoading = false

export function useConfigFetchError() {
    const fetchError = useValue(configFetchError$)

    return { fetchError }
}

async function fetchData(override?: boolean) {
    if (isLoading) return
    isLoading = true

    await when(appStoreSyncState$.isPersistLoaded)

    const DAYS_BEFORE_REFETCH = Number.parseFloat(process.env.EXPO_PUBLIC_CONFIG_CACHE_DAYS ?? '1')
    const configUpdatedAt = appStore$.configUpdatedAt.peek()

    const { days: daysLastUpdated = undefined } = dateTime(configUpdatedAt as DateTime)
        ?.diffNow("days")?.toObject() || {}

    logger.log('daysLastUpdated', daysLastUpdated)

    if (daysLastUpdated !== undefined && Math.abs(daysLastUpdated) < DAYS_BEFORE_REFETCH && !override) {
        isLoading = false
        return
    }

    getConfig(configFetching$, configFetchError$).then(config => {
        updateConfig(config)
    }).catch(e => logger.log('Error fetching config', e, 'IsNetworkError:', e instanceof NetworkError))
        .finally(() => { isLoading = false })
}

export function useFetchConfig() {
    return {
        fetchFailed: useValue(configFetchError$) !== undefined,
        isFetching: useValue(configFetching$),
        fetchData,
        loaded: useValue(appStore$.config?.endpoints) !== undefined
    }
}