import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button} from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, {Marker} from "react-native-maps";
import {useEffect, useState} from "react";
import * as Location from "expo-location";

const GetLocationProblemComponent = () => {
    const [myLocation, setMyLocation] = useState();
    const [draggableMarker, setDraggableMarker] = useState();
    const [address, setAddress] = useState("");

    useEffect(() => {
        (async () => {
            const permission = await Location.requestForegroundPermissionsAsync();

            if (permission.status !== "granted") {
                return;
            }
            const currentLocation = await Location.getCurrentPositionAsync({});

            const saveLocation = {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.10072350470899494,
                longitudeDelta: 0.07852938026189804,
            };
            setMyLocation(saveLocation);
            setDraggableMarker(saveLocation);

            const reverse = await Location.reverseGeocodeAsync(saveLocation);
            setAddress(createAddress(reverse));
        })();
    }, []);

    const nav = useNavigation();
    const getBack = async () => {
        nav.goBack();
    };

    const createAddress = (reverse) => {
        let dataToReturn;

        const street = reverse[0].street !== null ? reverse[0].street + ", " : "";
        const city = reverse[0].city !== null ? reverse[0].city + ", " : "";
        const region = reverse[0].region !== null ? reverse[0].region + ", " : "";
        const country = reverse[0].country !== null ? reverse[0].country : "";

        dataToReturn = street + city + region + country;

        return dataToReturn;
    }

    const getGeolocationAddress = async (e) => {
        setDraggableMarker(e.nativeEvent.coordinate);
        const reverse = await Location.reverseGeocodeAsync(e.nativeEvent.coordinate);
        setAddress(createAddress(reverse));
    };

    const acceptAndGoBackHandle = async () => {
        try {
            const res = await AsyncStorage.setItem(
                'coords',
                JSON.stringify(draggableMarker),
            );

        } catch (error) {
            console.error("AAA")
        }

        nav.goBack();
    }

    return (
        <>
            <View style={styles.container}>
                {myLocation && <MapView
                    style={styles.mapContainer}
                    mapType={"terrain"}
                    showsUserLocation={true}
                    initialRegion={myLocation}
                    showsMyLocationButton={false}
                    loadingEnabled={true}
                    rotateEnabled={false}
                    onPress={getGeolocationAddress}
                >
                    <Marker
                        draggable
                        coordinate={draggableMarker}
                        onDragEnd={getGeolocationAddress}
                    />
                </MapView>}
            </View>

            <View style={styles.goBackButton}>
                <TouchableOpacity onPress={getBack}>
                    <Image style={styles.imageStyle} source={require("../../assets/images/back.png")}/>
                </TouchableOpacity>
            </View>

            <View style={styles.acceptButton}>
                <Button
                    icon={require("../../assets/images/unblock.png")}
                    mode={"contained"}
                    onPress={acceptAndGoBackHandle}
                >
                    Accept
                </Button>
            </View>


            <View style={styles.informationContainer}>
                <Text>Address: {address}</Text>
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
    goBackButton: {
        position: 'absolute',
        top: '3%',
        left: '7%',
    },
    imageStyle: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    informationContainer: {
        position: 'absolute',
        bottom: '3%',
        left: '3%',
        padding: 30,
        opacity: 0.7,
        maxWidth: "100%",
        backgroundColor: '#fff',
    },
    acceptButton: {
        position: 'absolute',
        top: '3%',
        right: '3%'
    }
});

export default GetLocationProblemComponent;
