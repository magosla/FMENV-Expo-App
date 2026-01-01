import { Stack } from 'expo-router';
import NotFoundView from '@/views/not-found-view';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops! Not Found' }} />
            <NotFoundView />
        </>
    );
}
