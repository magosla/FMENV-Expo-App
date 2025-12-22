import { getConfig } from "@/services/config-service";
import { useAppStore } from "./use-app-store";
import { observable, when } from "@legendapp/state";
import { useValue } from "@legendapp/state/react";
import { DateTime } from "luxon";
import { dateTime } from "@/utils/date-time";
import { NetworkError } from "@/types/error";
import { logError } from "@/utils/log-error";

const isFetching$ = observable(false)
const error$ = observable<Error | undefined>()

export function useFetchConfigError() {
    const fetchError = useValue(() => error$.get())

    return { fetchError }
}


export function useFetchConfig() {
    const { config, configUpdatedAt, updateConfig } = useAppStore()

    const isFetching = useValue(isFetching$);
    const fetchFailed = useValue(() => error$.get() !== undefined)
    const loaded = useValue(() => config?.endpoints !== undefined)
    const DAYS_BEFORE_REFETCH = 1

    const fetchData = (override?: boolean) => {
        if (isFetching$.get()) return

        const { days: daysLastUpdated = undefined } = dateTime(configUpdatedAt as DateTime)
            ?.diffNow("days")?.toObject() || {}

        if (daysLastUpdated !== undefined && Math.abs(daysLastUpdated) < DAYS_BEFORE_REFETCH && !override) {
            return
        }

        getConfig(isFetching$, error$).then(config => {
            updateConfig(config)
        }).catch(e => logError('Error fetching config', e, 'IsNetworkError:', e instanceof NetworkError))
    }

    when(
        () => config,
        (v) => {
            console.log('use-fetch-config', v)
            fetchData()
        }
    )

    return {
        fetchFailed, isFetching, fetchData, loaded
    }
}