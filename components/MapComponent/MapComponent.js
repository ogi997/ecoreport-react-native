import {ActivityIndicator, StyleSheet, View} from "react-native";
import MapView, {Marker} from "react-native-maps";
import {useEffect, useRef, useState} from "react";
import * as Location from "expo-location";
import MapMenuComponent from "../MapMenuComponent/MapMenuComponent";
import {useDispatch, useSelector} from "react-redux";
import {status} from "../../redux-store/userSlice";
import {clearData, getDataOffline, getMapDataNotLogged, getMapLogged} from "../../redux-store/mapSlice";
import {useNavigation} from "@react-navigation/native";

const MapComponent = () => {

    const mapRef = useRef();
    const [myLocation, setMyLocation] = useState();
    const [edit, setEdit] = useState(false);
    const {authenticated} = useSelector((state) => state.users);
    const {data, loading} = useSelector((state) => state.map);
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {

            if (authenticated) {
                logged()
            } else {
                notLogged();
            }


        };
        dispatch(status());
        getData();

        return () => {
            dispatch(clearData());
        }

    }, []);

    const notLogged = async () => {
        const result = await dispatch(getMapDataNotLogged());

        if (result.error) {
            await dispatch(getDataOffline());
        }
    }

    const logged = async () => {
        const result = await dispatch(getMapLogged());
        if (result.error) {
            await dispatch(getDataOffline());
        }
    }

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
            }
            setMyLocation(saveLocation);
        })();

    }, []);

    const nav = useNavigation();
    const markerPressHandle = (e) => {
        if (!edit) return;

        nav.navigate("OpenReport", {state: {reportID: e.nativeEvent.id, disabledSave: false}});
    }

    const showMarkers = () => {
        return data.map((item, index) => {
            return (
                <Marker
                    key={index}
                    coordinate={item.location}
                    title={item.title}
                    description={item.description}
                    identifier={item.id.toString()}
                    onPress={markerPressHandle}
                />
            )
        })
    }

    return (
        <>

            <View style={styles.container}>

                {(myLocation && !loading) && <MapView
                    ref={mapRef}
                    style={styles.mapContainer}
                    mapType={"terrain"}
                    showsUserLocation={true}
                    initialRegion={myLocation}
                    showsMyLocationButton={false}
                    loadingEnabled={true}
                    rotateEnabled={false}
                >
                    {!loading ? showMarkers() : <ActivityIndicator size={"large"}/>}
                </MapView>}

                {authenticated && <View style={styles.menuContainer}>
                    <MapMenuComponent mapRef={mapRef} edit={edit} setEdit={setEdit}/>
                </View>}
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
        left: '15%',
        backgroundColor: '#fff',
        padding: 10,
        width: '70%'
    }
});

export default MapComponent;
