import { PropsWithChildren } from "react"
import { DimensionValue, StyleSheet } from "react-native"
import Logo from "./ui/logo"
import { ThemedLink } from "./ui/themed-link"
import { ThemedText } from "./ui/themed-text"
import { ThemedView, ThemedViewProps } from "./ui/themed-view"
import { ThemedTouchableOpacity } from "./ui/themed-touchable-opacity"

type Prop = ThemedViewProps & {
    returnHome?: boolean,
    title: string,
    onReload?: () => void,
    showLogo?: boolean
} & PropsWithChildren

export function Status({ returnHome, style, children, title, showLogo, onReload }: Prop) {
    return (
        <ThemedView style={[styles.container, style]}>
            <ThemedView style={styles.main}>
                <ThemedView style={styles.body}>
                    <ThemedText type="title"
                        themeColor="foregroundPrimary"
                        style={styles.title}>
                        {title}
                    </ThemedText>
                    <ThemedView>{children}</ThemedView>
                    <ThemedView style={styles.actions}>
                        {onReload &&
                            <ThemedTouchableOpacity
                                style={styles.actionReload}
                                activeOpacity={0.8}
                                onPress={onReload}
                                bgThemeColor="backgroundAccent"
                                borderThemeColor="foregroundAccent"
                            >
                                <ThemedText
                                    style={styles.actionReloadText}
                                    themeColor="foregroundAccent"
                                >Try again
                                </ThemedText>
                            </ThemedTouchableOpacity>}
                        {returnHome &&
                            <ThemedLink
                                href='..'
                                style={styles.actionHome}
                                themeColor="backgroundInfo"
                                borderThemeColor="foregroundInfo"
                            >
                                <ThemedText
                                    style={styles.actionHomeText}
                                    themeColor="foregroundInfo"
                                >
                                    Back
                                </ThemedText>
                            </ThemedLink>
                        }
                    </ThemedView>
                </ThemedView>
            </ThemedView>

            {showLogo && <ThemedView style={styles.footer}>
                <ThemedLink href={'..'}>
                    <Logo style={styles.footerLogo} />
                </ThemedLink>
            </ThemedView>}
        </ThemedView>
    )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8
    },
    body: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    main: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    title: {
        marginBottom: 20,
        opacity: 0.7,
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16
    },
    actionReload: {
        width: 'fit-content' as DimensionValue,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 4
    },
    actionReloadText: {
        width: 'fit-content' as DimensionValue,
        textAlign: 'center'
    },
    actionHome: {
        width: 'fit-content' as DimensionValue,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 4
    },
    actionHomeText: {
        width: 'fit-content' as DimensionValue,
        textAlign: 'center'
    },
    footer: {
        padding: 8,
        paddingBottom: 16,
    },
    footerLogo: {
        width: 187,
        height: 50,
        opacity: 0.7,
    }
})