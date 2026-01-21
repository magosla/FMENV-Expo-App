import { useThemeColor } from "@/hooks/use-theme-color"
import { appStore$ } from "@/stores/app"
import { Gas } from "@/types/core"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useValue } from "@legendapp/state/react"
import { StyleProp, StyleSheet, ViewStyle } from "react-native"
import { ThemedText } from "./ui/themed-text"
import { ThemedView } from "./ui/themed-view"
import { gasIcons } from "@/data/icons"

type Prop = {
    readonly title: string
    readonly titleIcon?: keyof typeof gasIcons
    readonly icon: keyof typeof gasIcons
    readonly gasesData: Gas[]
    readonly style?: StyleProp<ViewStyle>
}

export function MetricGroupCard({ gasesData, title, titleIcon, icon, style }: Prop) {
    const gases = useValue(appStore$.config.gases)

    const mutedColor = useThemeColor({}, 'foregroundMuted')

    return (
        <ThemedView style={[styles.container, style]}>
            <ThemedView
                bgThemeColor="backgroundPrimary"
                style={
                    styles.underlay
                } />
            <ThemedView style={styles.wrapper}>
                <ThemedView style={styles.titleWrapper}>
                    {titleIcon && <MaterialCommunityIcons
                        name={gasIcons[titleIcon] as "symbol"}
                        size={16} color={mutedColor} />}
                    <ThemedText style={styles.titleText}>{title}</ThemedText>
                </ThemedView>
                <ThemedView style={styles.body}>
                    <ThemedView style={styles.readingsWrap}>
                        {gasesData.map((gasData, i) => {
                            const gasInfo = gases?.[gasData.name]

                            return (
                                <ThemedView key={gasData.name} borderThemeColor="foregroundMuted" style={[styles.item
                                    , (i + 1) === gasesData.length ? styles.noBottomLine : {}]}>
                                    <ThemedText themeColor="foregroundPrimary" style={styles.readingLabel}>
                                        {gasInfo?.label}
                                    </ThemedText>
                                    <ThemedView style={styles.reading}>
                                        <ThemedText themeColor="foregroundSecondary" style={styles.readingValue}>
                                            {Number.parseFloat(gasData.value).toFixed(2)}
                                        </ThemedText>
                                        <ThemedText themeColor="foregroundSecondary" style={styles.readingSi}>
                                            {gasInfo?.siUnit || ''}
                                        </ThemedText>
                                    </ThemedView>
                                </ThemedView>
                            )
                        })}
                    </ThemedView>
                    <ThemedView style={styles.iconWrap}>
                        <MaterialCommunityIcons
                            name={gasIcons[icon] as "symbol"}
                            size={50}
                            style={styles.icon} color={mutedColor} />
                    </ThemedView>
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
        opacity: 0.8,
    },
    wrapper: {
        position: 'relative',
    },
    titleWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 2,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    titleText: {
        textTransform: 'uppercase',
        fontSize: 12,
        lineHeight: 16,
    },
    body: {
        display: 'flex',
        flexDirection: 'row',
    },
    readingsWrap: {
        flexBasis: '75%'
    },
    iconWrap: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        opacity: 0.35
    },
    item: {
        borderBottomWidth: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    noBottomLine: {
        borderBottomWidth: 0,
    },
    reading: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'flex-end',
        flexWrap: 'nowrap',
        columnGap: 3,
    },
    readingLabel: {
        fontSize: 14
    },
    readingValue: {
        fontWeight: '500',
        fontSize: 14,
    },
    readingSi: {
        fontSize: 14,
        fontWeight: '500',
    },
});