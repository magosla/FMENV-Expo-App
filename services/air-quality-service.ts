import { DateTime } from "luxon";
import type { AirQualityItem, Monitor } from "@/types/air-quality";
import { fetchData } from "./fetch-data";
import { Observable, ObservableBoolean } from "@legendapp/state";

function processRecentResponse(data?: { monitor: Monitor, air_quality: AirQualityItem }) {
    if (data === undefined) return

    const { monitor, air_quality } = data;

    if ('captured_at' in air_quality)
        air_quality['captureTime'] = DateTime.fromISO(air_quality.captured_at).setZone('local');

    air_quality['fetchedAt'] = DateTime.now().setZone('local')

    return ({ monitor, airQuality: air_quality })
}

export function getRecentAirQuality(endpoint: string, currentItem?: AirQualityItem, isFetching?: ObservableBoolean, error?: Observable<Error | undefined>) {

    const start_time = currentItem?.captured_at;

    const _endpoint = new URL(endpoint);

    if (start_time) {
        _endpoint.searchParams.set('start_time', start_time ?? "");
        _endpoint.searchParams.set('tz', DateTime.local().toFormat('ZZZZ'));
    }

    return fetchData<Partial<RecentResponse>>(_endpoint.toString(), isFetching, error).then(d => {
        return d?.items?.map(i => processRecentResponse(i))?.filter(Boolean) as RecentData
    })
}

type RecentResponse = {
    items?: { monitor: Monitor, air_quality: AirQualityItem }[]
    total?: number
}

export type RecentData = Required<ReturnType<typeof processRecentResponse>[]>|undefined