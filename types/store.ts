import { DateTime } from "luxon"
import { AirQualityItem, Monitor } from "./air-quality"
import { Theme } from "./core"
import { User } from "./user"
import { ConfigType } from "./config"

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
    setActiveId: (id?: string) => void
}

export type AirQualityStore = {
    recentAirQualities: Record<string, AirQualityItem>
    lastUpdatedAt?: DateTime
    activeRecentAirQuality?: AirQualityItem
}
