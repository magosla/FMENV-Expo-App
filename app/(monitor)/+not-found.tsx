import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { ThemedLink } from '@/components/ui/themed-link';
import { Status } from '@/components/status';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops! Not Found' }} />
            <Status title="Not found" showLogo={true}>
                <ThemedLink themeColor='foregroundInfo' href="/" style={styles.button}>
                    Go back to list of Monitors!
                </ThemedLink>
            </Status>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
    },
});
