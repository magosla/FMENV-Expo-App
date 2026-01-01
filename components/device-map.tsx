import { Coordinates } from 'expo-maps';
import {  Text } from "react-native";

export type DeviceMapProp = {
    readonly markers: {
        coordinates: Coordinates;
        title: string;
        id?: string;
    }[]
}
export function DeviceMap({ markers }: DeviceMapProp) {
    return <Text>Maps are only available on Android and iOS</Text>;
}