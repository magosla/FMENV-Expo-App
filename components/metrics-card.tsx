import type { Monitor } from "@/types/air-quality";
import { dateTime } from "@/utils/date-time";
import { MetricCard } from "./metric-card";
import { ThemedView } from "./ui/themed-view";
import { ThemedText } from "./ui/themed-text";
import { useFetchRecentAirQuality } from "@/hooks/use-fetch-air-quality";
import { useAirQualityStore } from "@/hooks/use-air-quality-store";
import { useFocusEffect } from "expo-router";
import { StyleSheet } from "react-native";
import { ComponentProps } from "react";

interface MetricsCardProps {
    monitor: Monitor | undefined;
    style?: ComponentProps<typeof ThemedView>['style'];
}
const airQualityFields = ['aqi', 'co', 'co2', 'no2', 'ozone', 'tvoc', 'pm10', 'pm2_5']

const isAirField = (field: string) => !['id', 'captureTime', 'captured_at', 'fetchedAt', 'location_id', 'monitor_id'].includes(field)

const isAirQualityField = (field: string) => airQualityFields.includes(field)

export function MetricsCard({ monitor, style }: MetricsCardProps) {
    const { recentAirQualities } = useAirQualityStore()
    const { isFetching, refreshData } = useFetchRecentAirQuality(monitor?.id, true)

    useFocusEffect(() => {
        const interval = setInterval(() => {
            refreshData()
        }, 4000)

        return () => {
            clearInterval(interval)
        }
    })

    const airQuality = recentAirQualities?.[monitor?.id ?? 'x']
    const lastUpdated = dateTime(airQuality?.captureTime)?.toRelative() || "—"

    return (
        <ThemedView bgThemeColor="backgroundPrimary" style={[styles.container, style]}>
            {isFetching && !airQuality &&
                <ThemedView style={styles.loading}><ThemedText type="small">Loading...</ThemedText></ThemedView>
            }

            {airQuality && <ThemedView style={styles.content}>

                <ThemedView style={styles.gasGroup}>
                    <ThemedView style={styles.gasList}>
                        {Object.keys(airQuality || {}).filter(isAirField).filter(f => !isAirQualityField(f))
                            .sort().map((field, i) => <MetricCard gasData={{ name: field, value: (airQuality?.[field] ?? '—') as string }}
                                key={`${field}-${airQuality?.[field]}`} />)
                        }
                    </ThemedView>
                </ThemedView>

                <ThemedView style={styles.gasGroup}>
                    <ThemedText style={styles.gasGroupTitle}>Air Quality Parameters</ThemedText>
                    <ThemedView style={styles.gasList}>
                        {Object.keys(airQuality || {}).filter(isAirField).filter(f => isAirQualityField(f))
                            .sort().map((field, i) => <MetricCard gasData={{ name: field, value: (airQuality?.[field] ?? '—') as string }}
                                key={`${field}-${airQuality?.[field]}`} />)
                        }
                    </ThemedView>
                </ThemedView>

                <ThemedText themeColor="foregroundMuted" style={styles.meta}>
                    Updated {lastUpdated}
                </ThemedText>
            </ThemedView>}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        borderRadius: 8,
        shadowColor: "rgba(0, 0, 0, 0.35)",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    loading: {
        padding: 8,
    },
    content: {
        padding: 8,
    },
    gasGroup: {
        marginBottom: 16,
    },
    gasGroupTitle: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '600',
        marginBottom: 8,
    },
    gasList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 8,
    },
    meta: {
        textAlign: 'center',
        fontSize: 12,
        lineHeight: 16,
    }
});