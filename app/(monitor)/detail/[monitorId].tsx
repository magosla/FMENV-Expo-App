import MonitorView from "@/views/monitor-view";
import { Stack, useLocalSearchParams } from "expo-router";

export default function MonitorDetailPage() {
    const { monitorId } = useLocalSearchParams<{ monitorId: string }>()

    return (
        <>
            <Stack.Screen
                getId={() => String(monitorId)}
            />
            <MonitorView monitorId={monitorId} />
        </>
    );
}
