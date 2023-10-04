import {SafeAreaView, StyleSheet, View} from "react-native";
import {Button, Text, TextInput} from 'react-native-paper';
import {useEffect, useState} from "react";
import {SelectList} from "react-native-dropdown-select-list";
import {Camera} from "expo-camera";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from "react-redux";
import {getAllProblemType, getCities} from "../../redux-store/choiceSlice";
import {createNewProblem} from "../../redux-store/mapSlice";
import wellknown from 'wellknown';
import uuid from 'uuid-random';
import Colors from '../../Colors';
import {showToast} from "../../utils/utils";


const ReportProblemComponent = () => {

    const [hasPermission, setHasPermission] = useState(false);
    const dispatch = useDispatch();
    const {problemTypeAdd, cities} = useSelector((state) => state.choices);
    const {loading} = useSelector((state) => state.map);

    //za slanje na server
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [errorType, setErrorType] = useState("");
    const [city, setCity] = useState("");

    const {photo} = useSelector((state) => state.camera);

    useEffect(() => {
        dispatch(getAllProblemType());
        dispatch(getCities());
    }, []);

    const reportProblemHandle = async () => {

        let coords;
        try {
            coords = await AsyncStorage.getItem('coords');

        } catch (error) {
            console.error(error);
        }
        let formData = new FormData();
        const point = {
            type: "Point",
            coordinates: []
        };

        point.coordinates.push(JSON.parse(coords).latitude);
        point.coordinates.push(JSON.parse(coords).longitude);

        formData.append('title', title);
        formData.append('note', note);
        formData.append('image', {
            uri: photo.newPhoto.uri,
            name: uuid() + '.jpg',
            type: 'image/jpg'
        });
        formData.append('problem_type', errorType);
        formData.append('city', city);
        formData.append('geometry', wellknown.stringify(point));

        await dispatch(createNewProblem({value: formData, type: "TYPE"}));
        showToast("You have succssfully reported problem.");
        nav.goBack();
    };
    const nav = useNavigation()
    const [cameraActive, setCameraActive] = useState(false);

    const takePictureHandle = async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        if (cameraPermission.status === "granted") {
            setHasPermission(true);
        }
        nav.navigate("Camera");
    };

    const getLocationButton = async () => {
        nav.navigate("GetLocation");
    }

    const validateForm = () => {
        return (title.length === 0 || note.length === 0 || errorType.length === 0 || city.length === 0);
    };


    return (
        <>
            <View style={{
                alignItems: 'center',
            }}>
                <SafeAreaView>
                    {
                        (!cameraActive) &&
                        <View style={styles.container}>
                            <Text style={{alignSelf: 'center'}} variant={"headlineLarge"}>Report EcoProblem</Text>
                            {/*<Image source={require("../../assets/images/loginPage.png")} style={styles.image} />*/}
                        </View>
                    }

                    <TextInput
                        label={"Title"}
                        style={styles.input}
                        placeholder={"Enter title"}
                        onChangeText={setTitle}
                    />

                    <TextInput
                        label={"Note"}
                        style={styles.input}
                        placeholder={"Enter note"}
                        onChangeText={setNote}
                    />

                    <View style={{
                        marginTop: 5
                    }}>
                        <Button
                            icon={require("../../assets/images/location.png")}
                            mode={"contained"}
                            onPress={getLocationButton}
                        > Select Location </Button>
                    </View>

                    <View style={{
                        marginTop: 5
                    }}>
                        <Button
                            icon={require("../../assets/images/phone-camera.png")}
                            mode={"contained"}
                            onPress={takePictureHandle}
                        > Take a picture </Button>
                    </View>

                    <View
                        style={{
                            marginTop: 10
                        }}
                    >
                        <Text variant={"labelLarge"}>Select a category</Text>
                        <SelectList
                            boxStyles={{backgroundColor: Colors.PRIMARY_COLOR}}
                            setSelected={(val) => setErrorType(val)}
                            data={problemTypeAdd}
                            save="key"
                        />
                    </View>

                    <View>
                        <Text variant={"labelLarge"}>Select city</Text>
                        <SelectList boxStyles={{backgroundColor: Colors.PRIMARY_COLOR}}
                                    setSelected={(val) => setCity(val)} data={cities} save={"key"}/>
                    </View>


                    <View style={{margin: 10}}>
                        <Button
                            loading={loading}
                            mode={"contained"}
                            onPress={reportProblemHandle}
                            disabled={validateForm()}
                        > Report problem </Button>
                    </View>
                </SafeAreaView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        padding: 25,
        backgroundColor: Colors.SECONDARY_COLOR,
    },
    input: {
        backgroundColor: Colors.PRIMARY_COLOR,
        width: 350
    },
});

export default ReportProblemComponent;
