import MonitorView from "@/views/monitor-view";
import { useLocalSearchParams } from "expo-router";

export default function MonitorDetailPage() {

    const { monitorId } = useLocalSearchParams<{ monitorId: string }>()

    return (
        <MonitorView monitorId={monitorId} />
    );
}