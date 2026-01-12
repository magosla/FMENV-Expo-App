import { useAirQualityFetchError } from "@/hooks/use-fetch-air-quality";
import { useMonitorsFetchError } from "@/hooks/use-fetch-monitor";
import { useGlobalSearchParams } from "expo-router";
import { RequestErrorView } from "./request-error-view";


export function FetchErrorView() {
    const { monitorId } = useGlobalSearchParams<{ monitorId?: string }>()
    const { fetchError } = useAirQualityFetchError(monitorId)
    const { fetchError: monitorFetchError } = useMonitorsFetchError()

    return (
        <RequestErrorView errorObject={monitorFetchError ?? fetchError} />
    )
}