import { logger } from "@/utils/logger";
import { StyleSheet } from "react-native";
import { MetricsCard } from "./metrics-card";
import { ThemedView, ThemedViewProps } from "./ui/themed-view";
import { ReadingsCard } from "./readings-card";

type Prop = ThemedViewProps & { monitorId: string, style?: ThemedViewProps["style"] }
export function MonitorSection({ monitorId, style }: Prop) {

    logger.log('in MonitorSection')

    return (
        <ThemedView style={[styles.container, style]}>
            <ReadingsCard monitorId={monitorId} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 0,
    }
});