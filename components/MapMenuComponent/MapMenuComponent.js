import {StyleSheet, Text, TouchableOpacity, View, Image, Button, ActivityIndicator} from "react-native";
import {useState} from "react";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
const MapMenuComponent = ({mapRef}) => {
    const [press, setPress] = useState(false);
    const [loading, setLoading] = useState(false);
    const takeSnapshot = async () => {
        setLoading(true);
        const snapshot = await mapRef.current.takeSnapshot({width: 200, height: 360, result: 'base64'});
        const uri = FileSystem.documentDirectory + "snapshot.png";
        await FileSystem.writeAsStringAsync(uri, snapshot, {encoding: FileSystem.EncodingType.Base64});

        await MediaLibrary.saveToLibraryAsync(uri);

        setLoading(false);
    }
    return (
        <>
            <TouchableOpacity onPress={() => setPress(prev => !prev)}>
                <View style={styles.container}>
                    <Text >GIS</Text>
                    <Image style={styles.image} source={!press ? require("../../assets/images/down-arrow.png") : require("../../assets/images/up-arrow.png")} />
                </View>
                <View style={{display: press ? 'block' : 'none'}}>
                    <View style={styles.menu}>
                        <Text>Take a snap</Text>
                        {!loading ? <Button title={"Snap"} onPress={takeSnapshot} /> : <ActivityIndicator size={"large"} />}

                        <Text>Save data as .csv</Text>
                        <Button title={"Downlad"} />
                    </View>
                </View>
            </TouchableOpacity>

            </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8
    },
    image: {
        width: 20,
        height: 20,
    },
    menu: {
        padding: 10,
        backgroundColor: '#c3c3c3'
    }
})

export default MapMenuComponent;
