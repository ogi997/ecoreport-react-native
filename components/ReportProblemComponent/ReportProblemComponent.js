import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import {useState, useEffect, useRef} from "react";
import {SelectList} from "react-native-dropdown-select-list";
import {Camera} from "expo-camera";
import {shareAsync} from "expo-sharing";
import * as MediaLibrary from 'expo-media-library';
import {useNavigation} from "@react-navigation/native";
import CameraComponent from "../CameraComponent/CameraComponent";

const dummyData = [
    {key:'1', value:'Mobiles'},
    {key:'2', value:'Appliances'},
    {key:'3', value:'Cameras'},
    {key:'4', value:'Computers'},
    {key:'5', value:'Vegetables'},
    {key:'6', value:'Diary Products'},
    {key:'7', value:'Drinks'},
]
const ReportProblemComponent = () => {

    const [hasPermission, setHasPermission] = useState(false);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [errorType, setErrorType] = useState("");


    const reportProblemHandle = () => {
        console.log("click");

        console.log("slika", image);
    };
    const nav = useNavigation()
    const takePictureHandle = async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
        console.log(cameraPermission)
        if (cameraPermission.status === "granted") {
            setHasPermission(true);
        }

        //modal neki ako ove permisije nisu dozvoljene da se zna fino

        // setHasCameraPermission(cameraPermission === "granted");
        // setHasMediaLibraryPermission(mediaLibraryPermission === "granted");
    };

    const validateForm = () => {
        return (title.length === 0 || note.length === 0)
    };

    return (
        <>
            {!hasPermission ? <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
            }}>
                <SafeAreaView>
                    <Text>Title:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={"Enter title"}
                        onChangeText={setTitle}
                    />

                    <Text>Note:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={"Enter note"}
                        onChangeText={setNote}
                    />

                    <View style={{
                        marginTop: 5
                    }}>
                        <Button title={"Location"} />
                    </View>

                    <View style={{
                        marginTop: 5
                    }}>
                        <Button
                            title={"Take a picture"}
                            onPress={takePictureHandle}
                        />
                    </View>

                    <View
                        style={{
                            marginTop: 10
                        }}
                    >
                        <SelectList
                            setSelected={(val) => setErrorType(val)}
                            data={dummyData}
                            save="key"
                        />
                    </View>


                    <View style={{margin: 10}}>
                        <Button
                            title={"Report problem"}
                            onPress={reportProblemHandle}
                            disabled={validateForm()}
                        />
                    </View>
                </SafeAreaView>


            </View> : <CameraComponent setHasPermission={setHasPermission} setImage={setImage}/>}

        </>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        //width: '100%',
        // margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default ReportProblemComponent;
