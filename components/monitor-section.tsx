import { MetricsCard } from "./metrics-card";
import { ThemedView, ThemedViewProps } from "./ui/themed-view";
import { StyleSheet } from "react-native";
import { logger } from "@/utils/logger";

type Prop = ThemedViewProps & { monitorId: string, style?: ThemedViewProps["style"] }
export function MonitorSection({ monitorId, style }: Prop) {

    logger.log('in MonitorSection')

    return (
        <ThemedView style={[styles.container, style]}>
            <MetricsCard monitorId={monitorId} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 0,
    }
});