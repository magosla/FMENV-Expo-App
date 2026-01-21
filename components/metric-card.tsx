import { getState } from "@/lib/gas-status"
import { Gas } from "@/types/core"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useMemo } from "react"
import { ThemedText } from "./ui/themed-text"
import { ThemedView } from "./ui/themed-view"
import { getColorMap } from "@/services/color-map-service"
import { useThemeColor } from "@/hooks/use-theme-color"
import { StyleProp, StyleSheet, ViewStyle } from "react-native"
import { appStore$ } from "@/stores/app"
import { useValue } from "@legendapp/state/react"
import { gasIcons } from "@/data/icons"

type Prop = {
  readonly gasData: Gas
  readonly style?: StyleProp<ViewStyle>
}

const colorMap = getColorMap()

export function MetricCard({ gasData, style }: Prop) {
  const gases = useValue(appStore$.config.gases)

  const gasInfo = gases?.[gasData.name]

  const colorData = useMemo(() => {
    const status = getState(gasData)

    return status === undefined ? undefined : colorMap?.[status]
  }, [gasData])
  const foregroundPrimary = useThemeColor({}, 'foregroundPrimary')
  const backgroundSecondary = useThemeColor({}, 'backgroundSecondary')
  const mutedColor = useThemeColor({}, 'foregroundMuted')

  return (
    <ThemedView style={[styles.container, style]}>
      <ThemedView style={[
        styles.wrapper,
        { backgroundColor: colorData?.background || backgroundSecondary },
      ]} />
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
          <ThemedText themeColor="foregroundMuted" type="small" style={styles.readingSi}>
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
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    opacity: 0.6,
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
    columnGap: 1.28,
  },
  readingValue: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
  },
  readingSi: {
    fontWeight: '600',
  },
});