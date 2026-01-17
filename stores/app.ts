import { type AppStore } from "@/types/store";
import { observable, syncState } from "@legendapp/state";
import { syncObservable } from "@legendapp/state/sync";
import { ObservablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTime } from "luxon";
import { type ConfigType } from "@/types/config";
import { type User } from "@/types/user";
import { type Theme } from "@/types/core";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";

enableReactTracking({
    warnMissingUse: true,
    warnUnobserved: true,
})

// Create a global observable for the AppStore
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

export const appStoreSyncState$ = syncState(appStore$)

export function updateConfig(payload: ConfigType) {
    if (payload?.user?.id !== undefined) {
        updateUser(payload.user)
    }

    appStore$.config.set(payload);

    if (payload.endpoints) appStore$.configUpdatedAt.set(DateTime.now())
}

export function updateUser(user?: User) {
    appStore$.user.set(user)
}

export function setTheme(theme: Theme) {
    appStore$.theme.set(theme)
}