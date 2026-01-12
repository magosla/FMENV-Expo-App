import { useAirQualityStore } from "@/hooks/use-air-quality-store";
import { useFetchRecentAirQuality } from "@/hooks/use-fetch-air-quality";
import type { Monitor } from "@/types/air-quality";
import { dateTime } from "@/utils/date-time";
import { logger } from "@/utils/logger";
import { useFocusEffect } from "expo-router";
import { ComponentProps, useCallback, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { MetricCard } from "./metric-card";
import { ThemedText } from "./ui/themed-text";
import { ThemedView } from "./ui/themed-view";

interface MetricsCardProps {
    readonly monitor: Monitor | undefined;
    readonly style?: ComponentProps<typeof ThemedView>['style'];
}
const airQualityFields = new Set(['aqi', 'co', 'co2', 'no2', 'ozone', 'tvoc', 'pm10', 'pm2_5'])

const isAirField = (field: string) => !['id', 'captureTime', 'captured_at', 'fetchedAt', 'location_id', 'monitor_id'].includes(field)

const isAirQualityField = (field: string) => airQualityFields.has(field)

export function MetricsCard({ monitor, style }: MetricsCardProps) {
    const { recentAirQualities } = useAirQualityStore()
    const { isFetching, refreshData } = useFetchRecentAirQuality(monitor?.id, true)
    const triedFetching = useRef(false)

    useEffect(() => {
        logger.log('calling first useEffect')
        refreshData()
    }, [refreshData])

    useFocusEffect(useCallback(() => {
        logger.log('calling useFocusEffect')
        const interval = setInterval(() => {
            refreshData()
        }, Number.parseInt(process.env.EXPO_PUBLIC_AIR_REFRESH_INTERVAL_SECONDS ?? '4') * 1000)

        return () => {
            logger.log('clearInterval(interval)')
            clearInterval(interval)
        }
    }, [refreshData]))

    useEffect(() => {
        logger.log('calling second useEffect')
        if (isFetching) {
            triedFetching.current = true
        }
    }, [isFetching])

    const airQuality = recentAirQualities?.[monitor?.id ?? 'x']
    const lastUpdated = dateTime(airQuality?.captureTime)?.toRelative() || "—"

    return (
        <ThemedView bgThemeColor="backgroundPrimary" style={[styles.container, style]}>
            {isFetching && !airQuality && !triedFetching.current &&
                <ThemedView style={styles.loading}><ThemedText type="small">Loading...</ThemedText></ThemedView>
            }

            {triedFetching.current && !airQuality &&
                <ThemedText style={styles.noData} type="small">No data available for now</ThemedText>
            }

            {airQuality && <ThemedView style={styles.content}>

                <ThemedView style={styles.gasGroup}>
                    <ThemedView style={styles.gasList}>
                        {Object.keys(airQuality || {}).filter(isAirField).filter(f => !isAirQualityField(f))
                            .toSorted((a, b) => a.localeCompare(b)).map((field, i) => <MetricCard gasData={{ name: field, value: (airQuality?.[field] ?? '—') as string }}
                                key={`${field}-${airQuality?.[field]}`} />)
                        }
                    </ThemedView>
                </ThemedView>

                <ThemedView style={styles.gasGroup}>
                    <ThemedText style={styles.gasGroupTitle}>Air Quality Parameters</ThemedText>
                    <ThemedView style={styles.gasList}>
                        {Object.keys(airQuality || {})
                            .filter(isAirField)
                            .filter(f => isAirQualityField(f))
                            .toSorted((a, b) => a.localeCompare(b)).map((field, i) => <MetricCard gasData={{ name: field, value: (airQuality?.[field] ?? '—') as string }}
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
        minHeight: 34,
        borderRadius: 8,
        shadowColor: "rgba(0, 0, 0, 0.35)",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    loading: {
        padding: 8,
        textAlign: 'center',
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
    },
    noData: {
        textAlign: 'center',
        padding: 8,
        fontSize: 14
    }
});