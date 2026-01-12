import type { AirQualityItem, Monitor } from "@/types/air-quality";
import type { AirQualityStore, AppStore, MonitorStore } from "@/types/store";
import { dateTime } from "@/utils/date-time";
import { observable } from "@legendapp/state";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import { ObservablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import { combineTransforms, syncObservable, transformStringifyDates } from "@legendapp/state/sync";
import AsyncStorage from "@react-native-async-storage/async-storage";

enableReactTracking({
    warnMissingUse: true,
    warnUnobserved:true,
})

// Create a global observable for the Todos
export const appStore$ = observable<AppStore>({
    config: undefined,
    user: undefined,
    theme: 'light',
});

// Persist the observable to the named key of the global persist plugin
syncObservable(appStore$, {
    persist: {
        name: 'app-store',
        plugin: new ObservablePersistAsyncStorage({ AsyncStorage })
    }
})


// Create a global observable for the Monitors
export const monitorStore$ = observable<MonitorStore>({
    monitors: {},
    activeMonitorId: undefined,
    activeMonitor: (): Monitor | undefined => monitorStore$.monitors.get()[monitorStore$.activeMonitorId.get() ?? '-'],
    lastUpdatedAt: undefined,
    setActiveId: (id?: string): void => monitorStore$.activeMonitorId.set(id),
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

// Create a global observable for the AirQuality
export const airQualityStore$ = observable<AirQualityStore>({
    recentAirQualities: {},
    activeRecentAirQuality: (): AirQualityItem | undefined =>
        airQualityStore$.recentAirQualities.get()[monitorStore$.activeMonitorId.get() || '-']
});

syncObservable(airQualityStore$, {
    persist: {
        name: 'air-quality-store',
        plugin: new ObservablePersistAsyncStorage({ AsyncStorage })
    }
})
