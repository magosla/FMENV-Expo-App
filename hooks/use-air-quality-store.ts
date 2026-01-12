import { airQualityStore$, monitorStore$ } from "@/stores";
import type { AirQualityItem, Monitor } from "@/types/air-quality";
import { useValue } from "@legendapp/state/react";

function prune() {
    const recentAirQualities = airQualityStore$.recentAirQualities.peek()
    const monitorIds = Object.keys(monitorStore$.monitors.peek())
    const l: Record<string, AirQualityItem> = {}

    Object.keys(recentAirQualities).filter(id => monitorIds.includes(id)).forEach(monitorId => {
        l[monitorId] = recentAirQualities[monitorId]
    })

    airQualityStore$.recentAirQualities.set(l)
}

function setRecentAirQualities(payload: { monitor: Monitor, airQuality: AirQualityItem }[]) {
    const l: Record<string, AirQualityItem> = {}
    payload.forEach(({ monitor, airQuality }) =>
        l[monitor.id] = airQuality)

    airQualityStore$.recentAirQualities.set(l)
}

function updateRecentAirQuality(payload: { monitor: Monitor, airQuality: AirQualityItem }) {
    airQualityStore$.recentAirQualities.set({ ...airQualityStore$.recentAirQualities.peek(), [payload.monitor.id]: payload.airQuality })
}

export function useAirQualityStore() {
    const recentAirQualities = useValue(airQualityStore$.recentAirQualities)
    const activeRecentAirQuality = useValue(airQualityStore$.activeRecentAirQuality)

    return {
        recentAirQualities,
        activeRecentAirQuality,
        setRecentAirQualities,
        updateRecentAirQuality,
        prune
    }
}

