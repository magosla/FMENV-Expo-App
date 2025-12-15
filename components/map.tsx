import { Platform, Text } from "react-native";
import { AppleMaps, Coordinates, GoogleMaps } from 'expo-maps';

type Prop = {
    markers: {
        coordinates: Coordinates;
        title: string;
        id?: string;
    }[]
}
export function Map({ markers }: Prop) {
    if (Platform.OS === 'ios') {
        return <AppleMaps.View style={{ flex: 1 }} markers={markers} />;
    } else if (Platform.OS === 'android') {
        return <GoogleMaps.View style={{ flex: 1 }} markers={markers} />;
    } else {
        return <Text>Maps are only available on Android and iOS</Text>;
    }
}