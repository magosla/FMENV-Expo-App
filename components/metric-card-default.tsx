import { useThemeColor } from "@/hooks/use-theme-color"
import { getState } from "@/lib/gas-status"
import { getColorMap } from "@/services/color-map-service"
import { appStore$ } from "@/stores/app"
import { Gas } from "@/types/core"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useValue } from "@legendapp/state/react"
import { useMemo } from "react"
import { StyleProp, StyleSheet, ViewStyle } from "react-native"
import { ThemedText } from "./ui/themed-text"
import { ThemedView } from "./ui/themed-view"
import { gasIcons } from "@/data/icons"

type Prop = {
    readonly gasData: Gas
    readonly style?: StyleProp<ViewStyle>
}

const colorMap = getColorMap()

export function MetricCardDefault({ gasData, style }: Prop) {
    const gases = useValue(appStore$.config.gases)

    const gasInfo = gases?.[gasData.name]

    const colorData = useMemo(() => {
        const status = getState(gasData)

        return status === undefined ? undefined : colorMap?.[status]
    }, [gasData])
    const foregroundPrimary = useThemeColor({}, 'foregroundPrimary')
    const mutedColor = useThemeColor({}, 'foregroundMuted')

    // const defaultBackground = useThemeColor({}, 'backgroundPrimary')

    return (
        <ThemedView style={[styles.container,
            style]}>
            <ThemedView bgThemeColor="backgroundPrimary" style={
                styles.underlay} />
            <ThemedView style={styles.body}>
                <ThemedView style={styles.title}>
                    {gasData.name in gasIcons && <MaterialCommunityIcons
                        name={gasIcons[(gasData.name as keyof typeof gasIcons)] as "symbol"}
                        size={18} color={colorData?.foreground || mutedColor} />}
                    <ThemedText themeColor="foregroundSecondary" style={styles.titleText}>{gasInfo?.label}</ThemedText>
                </ThemedView>
                <ThemedView style={styles.reading}>
                    <ThemedText style={[styles.readingValue, { color: colorData?.foreground || foregroundPrimary }]}>
                        {Number.parseFloat(gasData.value).toFixed(2)}
                    </ThemedText>
                    <ThemedText themeColor="foregroundSecondary" style={styles.readingSi}>
                        {gasInfo?.siUnit || ''}
                    </ThemedText>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        lineHeight: 1.25,
        borderRadius: 8,
        shadowColor: "rgba(0, 0, 0, 0.35)",
    },
    underlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 8,
        opacity: 0.85,
    },
    body: {
        position: 'relative',
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 2,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    titleText: {
        fontSize: 12,
        lineHeight: 16,
    },
    reading: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'flex-start',
        flexWrap: 'nowrap',
        columnGap: 3,
    },
    readingValue: {
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 20,
    },
    readingSi: {
        fontSize: 20,
        fontWeight: '600',
    },
});