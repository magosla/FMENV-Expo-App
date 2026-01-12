import { monitorStore$ } from "@/stores";
import type { Monitor } from "@/types/air-quality";
import { useValue } from "@legendapp/state/react";
import { DateTime } from "luxon";

function setMonitor(newMonitors: Monitor[]) {
    const l: Record<string, Monitor> = {};
    newMonitors.forEach(monitor => {
        l[monitor.id] = monitor
    })

    monitorStore$.monitors.set(l)

    if (Object.keys(l).length > 0) monitorStore$.lastUpdatedAt.set(DateTime.now())
}

function addMonitor(monitor: Monitor) {
    // monitorStore$.monitors.get()[monitor.id] = monitor
    monitorStore$.monitors.set({
        ...monitorStore$.monitors.peek(),
        [monitor.id]: monitor
    })
}

function hasMonitor(monitorId: string): boolean {
    return monitorId in monitorStore$.monitors.peek()
}

function setActiveMonitorId(monitorId: string | undefined) {
    monitorStore$.setActiveId(monitorId)
}

export function useMonitorStore() {
    const monitors = useValue(monitorStore$.monitors)
    const activeMonitorId = useValue(monitorStore$.activeMonitorId)
    const activeMonitor = useValue(monitorStore$.activeMonitor)
    const lastUpdatedAt = useValue(monitorStore$.lastUpdatedAt)

    return {
        monitors,
        activeMonitor,
        activeMonitorId,
        lastUpdatedAt,
        setMonitor,
        addMonitor,
        hasMonitor,
        setActiveMonitorId,
    }
}

