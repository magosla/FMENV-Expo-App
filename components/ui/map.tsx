import MapView, { LatLng, Marker } from 'react-native-maps';

type Prop = {
    initialRegion?: {
        latitude: number
        longitude: number
    }
    markers: {
        coordinates: LatLng;
        title: string;
        description?: string;
        id?: string;
    }[]
}
export function Map({ markers, initialRegion }: Prop) {
    let region = undefined
    if (initialRegion) {
        region = {
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    }

    return <MapView
        initialRegion={region}
    >
        {markers.map((marker, index) => (
            <Marker
                key={index}
                coordinate={marker.coordinates}
                title={marker.title}
                description={marker.description}
            />
        ))}
    </MapView>
}