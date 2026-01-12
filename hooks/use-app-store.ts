import { useValue } from "@legendapp/state/react"
import type { ConfigType } from "@/types/config";
import { DateTime } from "luxon";
import { appStore$ } from "@/stores";
import { Theme } from "@/types/core";

function updateConfig(payload: ConfigType) {
    if (payload?.user?.id !== undefined) {
        appStore$.user.set(payload.user)
    }

    appStore$.config.set(payload);

    if (payload.endpoints) appStore$.configUpdatedAt.set(DateTime.now())
}

function setTheme(theme: Theme) {
    appStore$.theme.set(theme)
}

export function useAppStore() {
    const config = useValue(appStore$.config)
    const theme = useValue(appStore$.theme)
    const configUpdatedAt = useValue(appStore$.configUpdatedAt)

    return {
        config,
        theme,
        configUpdatedAt,
        updateConfig,
        setTheme,
    }
}