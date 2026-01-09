import { getConfig } from "@/services/config-service";
import { NetworkError } from "@/types/error";
import { dateTime } from "@/utils/date-time";
import { logger } from "@/utils/logger";
import { observable, when } from "@legendapp/state";
import { useValue } from "@legendapp/state/react";
import { DateTime } from "luxon";
import { useAppStore } from "./use-app-store";

const isFetching$ = observable(false)
const error$ = observable<Error | undefined>()
let isLoading = false

export function useFetchConfigError() {
    const fetchError = useValue(() => error$.get())

    return { fetchError }
}


export function useFetchConfig() {
    const { config, configUpdatedAt, updateConfig } = useAppStore()

    const DAYS_BEFORE_REFETCH = 1

    const fetchData = (override?: boolean) => {
        if (isLoading) return

        const { days: daysLastUpdated = undefined } = dateTime(configUpdatedAt as DateTime)
            ?.diffNow("days")?.toObject() || {}

        if (daysLastUpdated !== undefined && Math.abs(daysLastUpdated) < DAYS_BEFORE_REFETCH && !override) {
            return
        }

        isLoading = true
        getConfig(isFetching$, error$).then(config => {
            updateConfig(config)
        }).catch(e => logger.log('Error fetching config', e, 'IsNetworkError:', e instanceof NetworkError))
            .finally(() => { isLoading = false })
    }

    return {
        fetchFailed: useValue(() => error$.get() !== undefined),
        isFetching: useValue(isFetching$),
        fetchData,
        loaded: useValue(() => config?.endpoints !== undefined)
    }
}