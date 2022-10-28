import { useState, useEffect, useCallback } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, Button, Linking, Alert } from 'react-native';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_APIKEY } from '../variables';

interface MapLocation {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

const Separator = () => {
    return (
        <View style={styles.sep} />
    );
};

const RedirectButton = (props: { link: string; }) => {
    const { link } = props;
    const handleRedirect = useCallback(
        async () => {
            const supported = await Linking.canOpenURL(link);
            if (!!!supported) {
                Alert.alert(`Link ${link} invalid. Try again.`);
                return;
            } 
            await Linking.openURL(link);
        }, [link]
    )
    return (
        <View style={styles.redirect}>
            <Button
                color={'white'}
                title={'Go to Google Maps'}
                onPress={handleRedirect}
            />
        </View>
    );
};

const ParkingMapView = () => {
    const ZOOM = 0.25;
    const [currLocation, setCurrLocation] = useState<Location.LocationObject | null>(null);

    useEffect(() => {
        (async () => {
            var location = await Location.getCurrentPositionAsync({});
            setCurrLocation(location);
        })();
    }, []);

    const lat = (currLocation !== null) ? currLocation.coords.latitude : 0.00,
        lng = (currLocation !== null) ? currLocation?.coords.longitude : 0.00;
    const region: MapLocation = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: ZOOM,
        longitudeDelta: ZOOM
    }

    const GOOGLE_MAPS_REDIRECT_URL = "https://maps.google.com";

    Geocoder.init(GOOGLE_APIKEY);
    
    return (
        <>
            <View style={styles.container}>
                <MapView 
                    style={styles.map}
                    provider={'google'}
                    showsUserLocation={true}
                    region={region}
                    loadingEnabled
                    customMapStyle={mapStyles}
                />
            </View>
            <Separator />
            <RedirectButton 
                link={GOOGLE_MAPS_REDIRECT_URL}
            />
        </>
    );
}

/* dimensions and styles for map view */
const TUNE = 0.5;
const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height * TUNE,
    },
    sep: {
        marginVertical: 8,
        borderBottomColor: '#777',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    redirect: {
        backgroundColor: '#49a429',
        padding: '2.5%',
        borderRadius: 20,
        width: '90%',
        marginLeft: '2.5%'
    }
});

/* style components within Google Maps*/ 
const mapStyles = [
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [
            { color: "#8a00c2" }
        ]
    },
    {
        featureType: 'road',
        elementType: "geometry.fill",
        stylers: [
            { color: '#e8bcf0' }
        ]
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
            { color: "#8a00c2" }
        ]
    },
    {
        featureType: 'administrative.neighborhood',
        elementType: 'labels.text.fill',
        stylers: [
            { color: "#241571" }
        ]
    },
];

export default ParkingMapView;
