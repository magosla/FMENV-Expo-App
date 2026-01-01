import { AppleMaps } from 'expo-maps';
import { DeviceMapProp } from './device-map';

export function DeviceMap({ markers }: Readonly<DeviceMapProp>) {
    return <AppleMaps.View style={{ flex: 1 }} markers={markers} />;
}