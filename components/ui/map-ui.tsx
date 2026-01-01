import MapView, { LatLng, Marker } from 'react-native-maps';

type Prop = {
    readonly initialRegion?: {
        latitude: number
        longitude: number
    }
    readonly markers: {
        coordinates: LatLng;
        title: string;
        description?: string;
        id?: string;
    }[]
}
export function MapUi({ markers, initialRegion }: Prop) {
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
        {markers.map((marker) => (
            <Marker
                key={`map-ui-${marker.coordinates}`}
                coordinate={marker.coordinates}
                title={marker.title}
                description={marker.description}
            />
        ))}
    </MapView>
}