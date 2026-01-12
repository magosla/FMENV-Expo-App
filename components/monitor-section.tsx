import { useMonitorStore } from "@/hooks/use-monitor-store";
import { MetricsCard } from "./metrics-card";
import { ThemedView, ThemedViewProps } from "./ui/themed-view";
import { StyleSheet } from "react-native";
import { logger } from "@/utils/logger";

type Prop = ThemedViewProps & { monitorId: string, style?: ThemedViewProps["style"] }
export function MonitorSection({ monitorId, style }: Prop) {
    const { monitors } = useMonitorStore()

    const monitor = monitors?.[monitorId]

    logger.log('in MonitorSection')

    return (
        <ThemedView style={[styles.container, style]}>
            <MetricsCard monitor={monitor} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 0,
    }
});