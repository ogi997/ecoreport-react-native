import {Camera} from "expo-camera";
import {Button, StyleSheet, View, ActivityIndicator} from "react-native";
import {useRef, useState} from "react";


const CameraComponent = ({setHasPermission, setImage}) => {
    let cameraRef = useRef();
    const [loading, setLoading] = useState(false);
    const takePic = async () => {
        setLoading(true);
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };
        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setHasPermission(false);
        setImage(newPhoto.base64);
        setLoading(false);
        // console.log("aaa",newPhoto);
    }
    return (
        <>
            <View style={styles.loadingContainer}>

                <ActivityIndicator animating={loading} size="large" />
            </View>
        <Camera style={styles.container} ref={cameraRef}>
            <View style={styles.buttonContainer}>
                <Button title={"Take a pic"}  onPress={takePic} />
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
        backgroundColor: "#fff",
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
