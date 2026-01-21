import { dateTime } from "@/utils/date-time";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { MetricCard } from "./metric-card";
import { MetricCardDefault } from "./metric-card-default";
import { ThemedText } from "./ui/themed-text";
import { ThemedView } from "./ui/themed-view";
import { AirQualityItem } from "@/types/air-quality";
import { MetricGroupCard } from "./metric-group-card";

interface Props {
    readonly airQuality: AirQualityItem;
    readonly style?: StyleProp<ViewStyle>;
}
const airQualityFields = new Set([
    "aqi",
    "co",
    "co2",
    "no2",
    "ozone",
    "tvoc",
    "pm10",
    "pm2_5",
]);

const windFields = new Set(['wind_speed', 'wind_direction'])
const rainFields = new Set(['rain_fall', 'rain_fall_period'])

const isAirField = (field: string) =>
    ![
        "id",
        "captureTime",
        "captured_at",
        "fetchedAt",
        "location_id",
        "monitor_id",
    ].includes(field);

const isAirQualityField = (field: string) => airQualityFields.has(field);

export function AirQualityCard({ airQuality, style }: Props) {
    let airData = Object.keys(airQuality || {})
        .filter(isAirField)
        .sort((a, b) => a.localeCompare(b));

    const windData = airData.filter(i => windFields.has(i))
    const rainData = airData.filter(i => rainFields.has(i))

    airData = windData.length > 1 ? airData.filter(i => !windFields.has(i)) : airData
    airData = rainData.length > 1 ? airData.filter(i => !rainFields.has(i)) : airData

    return (
        <ThemedView
            // bgThemeColor="backgroundPrimary"
            style={[styles.container, style]}
        >
            <ThemedView style={styles.content}>
                <ThemedView style={styles.gasGroup}>
                    {/* <ThemedText style={styles.gasGroupTitle}>
                        Air Quality Parameters
                    </ThemedText> */}
                    <ThemedView style={styles.gasList}>
                        {airData.filter(isAirQualityField).map(field => (
                            <MetricCardDefault
                                style={styles.gasItem}
                                key={`${field}-${airQuality?.[field]}`}
                                gasData={{
                                    name: field,
                                    value: (airQuality?.[field] ?? "—") as string,
                                }}
                            />
                        ))}
                    </ThemedView>
                </ThemedView>
                {windData.length > 1 && <MetricGroupCard
                    style={styles.groupedItem}
                    gasesData={windData.map(f => ({ name: f, value: airQuality[f] as string }))}
                    title="wind"
                    titleIcon="wind_speed"
                    icon="wind"
                />}

                {rainData.length > 1 && <MetricGroupCard
                    style={styles.groupedItem}
                    gasesData={rainData.map(f => ({ name: f, value: airQuality[f] as string }))}
                    title="rain"
                    titleIcon="rain"
                    icon="rain_fall"
                />}
                <ThemedView style={styles.gasGroup}>
                    <ThemedView style={styles.gasList}>
                        {airData
                            .filter((f) => !isAirQualityField(f))
                            .map(field => (
                                <MetricCardDefault
                                    style={styles.gasItem}
                                    key={`${field}-${airQuality?.[field]}`}
                                    gasData={{
                                        name: field,
                                        value: (airQuality?.[field] ?? "—") as string,
                                    }}
                                />
                            ))}
                    </ThemedView>
                </ThemedView>

                <ThemedText themeColor="foregroundSecondary" style={styles.meta}>
                    Updated {dateTime(airQuality?.captureTime)?.toRelative() || "—"}
                </ThemedText>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
    },
    loading: {
        padding: 8,
        textAlign: "center",
    },
    content: {
        padding: 0,
    },
    gasGroup: {
        marginBottom: 8,
    },
    gasGroupTitle: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "600",
        marginBottom: 8,
    },
    gasList: {
        flexDirection: "row",
        flexWrap: "wrap",
        columnGap: 8,
        rowGap: 8,
    },
    groupedItem: {
        marginBottom: 8,
    },
    gasItem: {
        flexBasis: '45%',
        flex: 1
    },
    meta: {
        marginTop: 4,
        textAlign: "center",
        fontSize: 12,
        lineHeight: 16,
    },
    noData: {
        textAlign: "center",
        padding: 8,
        fontSize: 14,
    },
});
