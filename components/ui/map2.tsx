import { AppleMaps, Coordinates, GoogleMaps } from 'expo-maps';
import { Platform, Text } from "react-native";

type Prop = {
    markers: {
        coordinates: Coordinates;
        title: string;
        id?: string;
    }[]
}
export function Map2({ markers }: Prop) {
    if (Platform.OS === 'ios') {
        return <AppleMaps.View style={{ flex: 1 }} markers={markers} />;
    } else if (Platform.OS === 'android') {
        return <GoogleMaps.View style={{ flex: 1 }} markers={markers} />;
    } else {
        return <Text>Maps are only available on Android and iOS</Text>;
    }
}