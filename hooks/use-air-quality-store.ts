import { airQualityStore$ } from "@/stores";
import type { AirQualityItem, Monitor } from "@/types/air-quality";
import { useValue } from "@legendapp/state/react";

export function useAirQualityStore() {
    const recentAirQualities = useValue(airQualityStore$.recentAirQualities)
    const activeRecentAirQuality = useValue(airQualityStore$.activeRecentAirQuality)

    function setRecentAirQualities(payload: { monitor: Monitor, airQuality: AirQualityItem }[]) {
        const l: Record<string, AirQualityItem> = {}
        payload.forEach(({ monitor, airQuality }) =>
            l[monitor.id] = airQuality)

        airQualityStore$.recentAirQualities.set(l)
    }

    function updateRecentAirQuality(payload: { monitor: Monitor, airQuality: AirQualityItem }) {
        airQualityStore$.recentAirQualities.set({ ...airQualityStore$.recentAirQualities.peek(), [payload.monitor.id]: payload.airQuality })
    }

    return {
        recentAirQualities,
        activeRecentAirQuality,
        setRecentAirQualities,
        updateRecentAirQuality,
    }
}

