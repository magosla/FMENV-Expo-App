import { ThemedView, ThemedViewProps } from "./ui/themed-view"
import { ThemedText } from "./ui/themed-text"
import { getColorMap } from "@/services/color-map-service"
import { Header } from "./ui/header"
import { StyleSheet } from "react-native"

const colorMap = getColorMap()

export const PollutionColorMap = ({ style, ...props }: ThemedViewProps) => {

    return (
        <ThemedView style={[styles.container, style]} {...props}>
            <Header>Air Quality Color Index</Header>
            <ThemedView style={styles.body} bgThemeColor="backgroundPrimary">
                <ThemedView style={styles.list}>
                    {Object.keys(colorMap ?? {}).reverse().map((k, i) => (
                        <ThemedText
                            type="small"
                            style={[styles.listItem, {
                                color: colorMap?.[k]?.foreground,
                                backgroundColor: colorMap?.[k]?.background,
                            }]}
                            key={`${k}-${i}`}>{colorMap?.[k]?.title}</ThemedText>
                    ))}
                </ThemedView>
            </ThemedView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 8,
        paddingBottom: 16,
    },
    body: {
        marginTop: 4,
        borderRadius: 8,
        padding: 2,
        shadowColor: "rgba(0, 0, 0, 0.35)",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        flexWrap: 'wrap',
    },
    listItem: {
        padding: 8,
        borderRadius: 4,
        flexBasis: '28%',
        flex: 1,
        textAlign: 'center',
    },
});