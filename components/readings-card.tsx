import { useAirQualityFetchState, useFetchRecentAirQuality } from "@/hooks/use-fetch-air-quality";
import { airQualityStore$ } from "@/stores/recent-air-quality";
import { logger } from "@/utils/logger";
import { useValue } from "@legendapp/state/react";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { ThemedText } from "./ui/themed-text";
import { ThemedView } from "./ui/themed-view";
import { AirQualityCard } from "./air-quality-card";

interface ReadingsCardProps {
    readonly monitorId: string;
    readonly style?: StyleProp<ViewStyle>
}

export function ReadingsCard({ monitorId, style }: ReadingsCardProps) {
    const airQuality = useValue(airQualityStore$.recentAirQuality(monitorId))
    const { refreshData } = useFetchRecentAirQuality(monitorId, true)
    const { isFetching } = useAirQualityFetchState(monitorId)
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

    if (airQuality)
        return <AirQualityCard airQuality={airQuality} />

    return (
        <ThemedView bgThemeColor="backgroundPrimary" style={[styles.container, style]}>
            {isFetching && !airQuality && !triedFetching.current &&
                <ThemedView style={styles.loading}><ThemedText type="small">Loading...</ThemedText></ThemedView>
            }

            {triedFetching.current && !airQuality &&
                <ThemedText style={styles.noData} type="small">No data available for now</ThemedText>
            }
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
    noData: {
        textAlign: 'center',
        padding: 8,
        fontSize: 14
    }
});