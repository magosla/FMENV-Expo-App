import { DateTime } from "luxon"
import { AirQualityItem, Monitor } from "./air-quality"
import { Theme } from "./core"
import { User } from "./user"
import { ConfigType } from "./config"
import { Observable } from "@legendapp/state"

export type AppStore = {
    config?: ConfigType
    user?: User
    theme: Theme
    configUpdatedAt?: DateTime
}

export type MonitorStore = {
    monitors: Record<string, Monitor>
    activeMonitorId?: string
    activeMonitor?: Monitor
    lastUpdatedAt?: DateTime
    monitor: (id: string) => Observable<Monitor>
}

export type AirQualityStore = {
    recentAirQualities: Record<string, AirQualityItem>
    lastUpdatedAt?: DateTime
    activeRecentAirQuality?: AirQualityItem
    recentAirQuality: (monitorId: string) => Observable<AirQualityItem>
}
