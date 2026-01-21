import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

type Props = { style?: StyleProp<ViewStyle> } & {
    children?: string;
    subTitle?: string
}

export function Header({ children, style, subTitle }: Props) {
    const foregroundPrimary = useThemeColor({}, 'foregroundPrimary');
    const foregroundSecondary = useThemeColor({}, 'foregroundSecondary');
    return (
        <ThemedView style={[styles.container, style]}>
            {children && <ThemedText
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.title, { color: foregroundPrimary }]}
                type="title">{children}</ThemedText>}
            {subTitle && <ThemedText
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.subtitle, { color: foregroundSecondary }]} type="subtitle">
                {subTitle}
            </ThemedText>}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        marginLeft: 12,
        marginBottom: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 'semibold',
        lineHeight: 20,
    }
});
