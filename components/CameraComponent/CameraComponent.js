import {Camera, CameraType} from "expo-camera";
import {StyleSheet, View} from "react-native";
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {useRef, useState} from "react";
import {savePhoto} from "../../redux-store/cameraSlice";
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";

const CameraComponent = () => {

    let cameraRef = useRef();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const nav = useNavigation();

    const takePic = async () => {
        setLoading(true);
        let options = {
            quality: 1,
            base64: true,
            exif: false,
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        dispatch(savePhoto({newPhoto}));
        nav.goBack();
    }
    return (
        <>
            <View style={styles.loadingContainer}>

                <ActivityIndicator animating={loading} size="large"/>
            </View>
            <Camera style={styles.container} ref={cameraRef} type={CameraType.back}>
                <View style={styles.buttonContainer}>
                    <IconButton
                        disabled={loading}
                        mode={"contained"}
                        icon={require("../../assets/images/camera.png")}
                        size={50}
                        onPress={takePic}
                    />

                </View>
            </Camera>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: '5%',
        right: '40%',
        // backgroundColor: "#fff",
        alignSelf: 'flex-end',
    },
    loadingContainer: {
        zIndex: 999,
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: 0,
        padding: 0,
    },
    loading: {
        position: "absolute",
        top: "50%",
        left: "5%",
        // zIndex: '1',
    }
})

export default CameraComponent;
