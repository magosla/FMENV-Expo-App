import { useFetchAirQualityError } from "@/hooks/use-fetch-air-quality"
import { useFetchMonitorsError } from "@/hooks/use-fetch-monitor"
import { useGlobalSearchParams } from "expo-router";
import { RequestErrorView } from "./request-error-view";


export function FetchErrorView() {
    const { monitorId } = useGlobalSearchParams<{ monitorId?: string }>()
    const { fetchError } = useFetchAirQualityError(monitorId)
    const { fetchError: monitorFetchError } = useFetchMonitorsError()

    return (
        <RequestErrorView errorObject={monitorFetchError ?? fetchError} />
    )
}