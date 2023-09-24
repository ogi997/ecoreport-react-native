import {Button, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
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
            };
            setMyLocation(saveLocation);
            setDraggableMarker(saveLocation);

            const reverse = await Location.reverseGeocodeAsync(saveLocation);
            setAddress(reverse[0].street + " " + reverse[0].city + " " + reverse[0].region + " " + reverse[0].country);
        })();
    }, []);

    const nav = useNavigation();
    const getBack = async () => {
        nav.goBack();
    };

    const getGeolocationAddress = async (e) => {
        setDraggableMarker(e.nativeEvent.coordinate);
        const reverse = await Location.reverseGeocodeAsync(e.nativeEvent.coordinate);
        // const data = JSON.stringify(reverse);
        // const dataToSave
        // console.log("REZULTAT", JSON.stringify(reverse));
        setAddress(reverse[0].street + " " + reverse[0].city + " " + reverse[0].region + " " + reverse[0].country);

    };

    const acceptAndGoBackHandle = async () => {
        try {
            const res = await AsyncStorage.setItem(
                'coords',
                JSON.stringify(draggableMarker),
            );

            console.log("RES@", res);
        } catch (error) {
            console.log("AAA")
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
              >


                  <Marker
                      draggable
                      coordinate={draggableMarker}
                      // onDragEnd={(e) => setDraggableMarker(e.nativeEvent.coordinate)}
                      onDragEnd={getGeolocationAddress}
                      // onDragStart={dragStarted}

                      onPress={(e) => console.log("CLick", e)}
                      // isPreselected={true}
                  />
              </MapView>}
          </View>

            <View style={styles.goBackButton}>
                <TouchableOpacity onPress={getBack}>
                <Image style={styles.imageStyle} source={require("../../assets/images/back.png")} />
                </TouchableOpacity>
                    {/*<Button title={"Back"} onPress={getBack} />*/}
                {/*<Text onPress={getBack}></Text>*/}
            </View>

          <View style={styles.acceptButton}>
              <Button onPress={acceptAndGoBackHandle} title={"Accept"} />
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
        // padding: 20,
        // backgroundColor: '#fff'
        // top: '3%',
        // left: '5%',
        // borderRadius: '99px',
        // backgroundColor: "#fff",
        // padding: 10,
    },
    imageStyle: {
        width: 30,
        height: 30,
        // padding: 20,
        // margin: 20,
        resizeMode: 'contain',
        // backgroundColor: '#fff',
    },
    informationContainer: {
        position: 'absolute',
        bottom: '3%',
        left: '3%',
        padding: 30,
        opacity: 0.7,
        maxWidth: "100%",
        // width: 100,
        // height: '200px',
        backgroundColor: '#fff',
        // borderColor: '#000',
    },
    acceptButton: {
        position: 'absolute',
        top: '3%',
        right: '3%'
    }
});

export default GetLocationProblemComponent;
