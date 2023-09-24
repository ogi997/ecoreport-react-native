import {Text, View, StyleSheet, Button} from "react-native";
import MapView, {Marker} from "react-native-maps";
import {useState, useEffect, useRef} from "react";
import * as Location from "expo-location";
import MapMenuComponent from "../MapMenuComponent/MapMenuComponent";
const MapComponent = () => {

    const dummyData = [
        {
            id: 100,
            title: "First marker",
            location: {
                latitude: 44.7730739524215,
                longitude: 17.183029389279035,
            },
            description: "My first marker"
        },
        {
             id: 101,
            title: "First marker",
            location: {
                latitude: 44.770880381838595,
                longitude: 17.195903992844205,
            },
            description: "My first marker"
        }
    ]
    const mapRef = useRef();
    const [myLocation, setMyLocation] = useState();

    useEffect(() => {
        (async () => {
            const permission =  await Location.requestForegroundPermissionsAsync();

            if (permission.status !== "granted") {
                console.log("neki modal da ne moze dalje");
                return;
            }
            const currentLocation = await Location.getCurrentPositionAsync({});
            const saveLocation = {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.10072350470899494,
                longitudeDelta: 0.07852938026189804,
            }
            setMyLocation(saveLocation);
        })();

    }, []);

    const showMarkers = () => {
        return dummyData.map((item, index) => {
            // console.log(item.id)
            return (
                <Marker
                    key={index}
                    coordinate={item.location}
                    title={item.title}
                    description={item.description}
                    identifier={item.id.toString()}
                    onPress={(e) => console.log(e.nativeEvent.id)}
                />
            )
        })
    }

    return (
        <>

            <View style={styles.container}>

                {myLocation && <MapView
                    ref={mapRef}
                    style={styles.mapContainer}
                    mapType={"terrain"}
                    showsUserLocation={true}
                    initialRegion={myLocation}
                    showsMyLocationButton={false}
                    loadingEnabled={true}
                    rotateEnabled={false}
                >
                    {showMarkers()}
                </MapView>}

                <View style={styles.menuContainer}>
                    <MapMenuComponent mapRef={mapRef} />
                </View>
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapContainer: {
        width: '100%',
        height: '100%',
    },
    menuContainer: {
        position: 'absolute',
        top: '3%',
        left: '25%',
        backgroundColor: '#fff',
        padding: 10,
        width: '50%'
    }
});

export default MapComponent;
