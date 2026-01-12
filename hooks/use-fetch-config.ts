import { getConfig } from "@/services/config-service";
import { NetworkError } from "@/types/error";
import { dateTime } from "@/utils/date-time";
import { logger } from "@/utils/logger";
import { observable } from "@legendapp/state";
import { useValue } from "@legendapp/state/react";
import { DateTime } from "luxon";
import { useAppStore } from "./use-app-store";
import { useCallback } from "react";
import { appStore$ } from "@/stores";

const isFetching$ = observable(false)
const error$ = observable<Error | undefined>()
let isLoading = false

export function useFetchConfigError() {
    const fetchError = useValue(error$)

    return { fetchError }
}

export function useFetchConfig() {
    const { config, updateConfig } = useAppStore()

    const fetchData = useCallback((override?: boolean) => {
        if (isLoading) return
        const DAYS_BEFORE_REFETCH = Number.parseFloat(process.env.EXPO_PUBLIC_CONFIG_CACHE_DAYS ?? '1')
        const configUpdatedAt = appStore$.configUpdatedAt.peek()

        const { days: daysLastUpdated = undefined } = dateTime(configUpdatedAt as DateTime)
            ?.diffNow("days")?.toObject() || {}

        logger.log('daysLastUpdated', daysLastUpdated)

        if (daysLastUpdated !== undefined && Math.abs(daysLastUpdated) < DAYS_BEFORE_REFETCH && !override) {
            return
        }

        isLoading = true
        getConfig(isFetching$, error$).then(config => {
            updateConfig(config)
        }).catch(e => logger.log('Error fetching config', e, 'IsNetworkError:', e instanceof NetworkError))
            .finally(() => { isLoading = false })
    }, [updateConfig])

    return {
        fetchFailed: useValue(error$) !== undefined,
        isFetching: useValue(isFetching$),
        fetchData,
        loaded: useValue(config?.endpoints) !== undefined
    }
}