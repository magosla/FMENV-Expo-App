import { Status } from "@/components/status";
import { ThemedLink } from "@/components/ui/themed-link";
import { StyleSheet } from "react-native";

export default function NotFoundView() {
    return (
        <Status title="Not found" showLogo={true}>
            <ThemedLink themeColor='foregroundInfo' href="/" style={styles.button}>
                Go back to list of Monitors!
            </ThemedLink>
        </Status>
    );
}

const styles = StyleSheet.create({
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
    },
});