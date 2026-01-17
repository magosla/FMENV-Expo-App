import { AirQualityItem, Monitor } from "@/types/air-quality";
import { AirQualityStore } from "@/types/store";
import { Observable, observable, syncState } from "@legendapp/state";
import { ObservablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import {  syncObservable } from "@legendapp/state/sync";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { monitorStore$ } from "./monitor";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";

enableReactTracking({
    warnMissingUse: true,
    warnUnobserved: true,
})

// Create a global observable for the AirQuality
export const airQualityStore$ = observable<AirQualityStore>({
    recentAirQualities: {},
    activeRecentAirQuality: (): Observable<AirQualityItem> =>
        airQualityStore$.recentAirQuality(monitorStore$.activeMonitorId.get() || '-'),
    recentAirQuality(monitorId): Observable<AirQualityItem> {
        return airQualityStore$.recentAirQualities[monitorId]
    },
});

export function prune() {
    const recentAirQualities = airQualityStore$.recentAirQualities.peek()
    const monitorIds = Object.keys(monitorStore$.monitors.peek())
    const l: Record<string, AirQualityItem> = {}

    Object.keys(recentAirQualities).filter(id => monitorIds.includes(id)).forEach(monitorId => {
        l[monitorId] = recentAirQualities[monitorId]
    })

    airQualityStore$.recentAirQualities.set(l)
}

export function setRecentAirQualities(payload: { monitor: Monitor, airQuality: AirQualityItem }[]) {
    const l: Record<string, AirQualityItem> = {}
    payload.forEach(({ monitor, airQuality }) =>
        l[monitor.id] = airQuality)

    airQualityStore$.recentAirQualities.set(l)
    airQualityStore$.recentAirQualities.set(l)
}

export function updateRecentAirQuality(payload: { monitor: Monitor, airQuality: AirQualityItem }) {
    const data = { ...airQualityStore$.recentAirQualities.peek(), [payload.monitor.id]: payload.airQuality }
    airQualityStore$.recentAirQualities.set(data)
    airQualityStore$.recentAirQualities.set(data)
}

syncObservable(airQualityStore$, {
    persist: {
        name: 'air-quality-store',
        plugin: new ObservablePersistAsyncStorage({ AsyncStorage })
    }
})

export const airQualityStoreSyncState$ = syncState(airQualityStore$)