import { type Monitor } from "@/types/air-quality";
import { type MonitorStore } from "@/types/store";
import { dateTime } from "@/utils/date-time";
import { Observable, observable, syncState } from "@legendapp/state";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import { ObservablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import { combineTransforms, syncObservable, transformStringifyDates } from "@legendapp/state/sync";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTime } from "luxon";

enableReactTracking({
    warnMissingUse: true,
    warnUnobserved: true,
})

// Create a global observable for the Monitors
export const monitorStore$ = observable<MonitorStore>({
    monitors: {},
    activeMonitorId: undefined,
    activeMonitor: (): Observable<Monitor> | undefined => monitorStore$.monitor(monitorStore$.activeMonitorId.get() ?? '-'),
    lastUpdatedAt: undefined,
    monitor(id): Observable<Monitor> {
        return monitorStore$.monitors[id]
    },
});

// Persist the observable to the named key of the global persist plugin
syncObservable(monitorStore$, {
    persist: {
        name: 'monitors-store',
        plugin: new ObservablePersistAsyncStorage({ AsyncStorage })
    },
    transform: combineTransforms(
        transformStringifyDates(),
        {
            load: async (value) => {
                value.lastUpdatedAt = dateTime(value.lastUpdatedAt ?? undefined)

                return value
            },
        }
    )
})

export const monitorStoreSyncState$ = syncState(monitorStore$)

export function setActiveMonitorId(id?: string) {
    monitorStore$.activeMonitorId.set(id)
}

export function setMonitors(monitors: Monitor[]) {
    const l: Record<string, Monitor> = {};
    monitors.forEach(monitor => {
        l[monitor.id] = monitor
    })

    monitorStore$.monitors.set(l)
    monitorStore$.monitors.set(l)

    if (Object.keys(l).length > 0) monitorStore$.lastUpdatedAt.set(DateTime.now())
}

export function addMonitor(monitor: Monitor) {
    monitorStore$.monitors.set({
        ...monitorStore$.monitors.peek(),
        [monitor.id]: monitor
    })
}