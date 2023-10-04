import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {Button, Text} from 'react-native-paper';
import {useEffect, useState} from "react";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import {SelectList} from "react-native-dropdown-select-list";
import {useDispatch, useSelector} from "react-redux";
import {getProblemTypeForFilter} from "../../redux-store/choiceSlice";
import {getFilteredData, getMapLogged} from '../../redux-store/mapSlice';
import {showToast} from '../../utils/utils';
import Colors from '../../Colors';

const MapMenuComponent = ({mapRef, edit, setEdit}) => {
    const [press, setPress] = useState(false);
    const [loading, setLoading] = useState(false);
    const takeSnapshot = async () => {
        setLoading(true);
        const snapshot = await mapRef.current.takeSnapshot({width: 200, height: 360, result: 'base64'});
        const uri = FileSystem.documentDirectory + "snapshot.png";
        await FileSystem.writeAsStringAsync(uri, snapshot, {encoding: FileSystem.EncodingType.Base64});

        await MediaLibrary.saveToLibraryAsync(uri);

        setLoading(false);

        showToast("You have successfully screenshot map.");
    };

    const dispatch = useDispatch();
    const {problemType} = useSelector((state) => state.choices);
    useEffect(() => {
        dispatch(getProblemTypeForFilter());
    }, []);

    const filteredData = (val) => {
        if (val === "SVI")
            dispatch(getMapLogged());
        else
            dispatch(getFilteredData({val}));
    };

    return (
        <>
            <TouchableOpacity onPress={() => setPress(prev => !prev)}>
                <View style={styles.container}>
                    <Text variant={"labelLarge"}>GIS</Text>
                    <Image style={styles.image}
                           source={!press ? require("../../assets/images/down-arrow.png") : require("../../assets/images/up-arrow.png")}/>
                </View>
                <View style={{display: press ? 'block' : 'none', borderTopWidth: press ? 1 : 0}}>
                    <View style={styles.menu}>
                        <Text variant={"labelLarge"}>Take a snap</Text>
                        {/*{!loading ? <Button title={"Snap"} onPress={takeSnapshot} > Snap </Button> : <ActivityIndicator size={"large"} />}*/}
                        <Button
                            loading={loading}
                            icon={require("../../assets/images/photo.png")}
                            mode={"contained"}
                            onPress={takeSnapshot}
                        > Snap </Button>

                        <Text variant={"labelLarge"}>Open marker</Text>
                        <Button
                            mode={"contained"}
                            icon={require("../../assets/images/openMarker.png")}
                            onPress={() => setEdit((prev) => !prev)}
                            buttonColor={edit && Colors.SECONDARY_COLOR}
                        >
                            Open
                        </Button>
                        {/*<Button title={"Open"} onPress={() => setEdit((prev) => !prev)} color={!edit ? '#2196F3' : '#000'} />*/}

                        <Text variant={"labelLarge"}>Filter</Text>
                        <SelectList
                            data={problemType}
                            save={"key"}
                            setSelected={filteredData}
                            placeholder={"Show all"}
                        />
                        {/*<Button title={"Reset filter"} onPress={resetFilter} />*/}
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
        padding: 8,
    },
    image: {
        width: 20,
        height: 20,
    },
    menu: {
        padding: 10,
    }
})

export default MapMenuComponent;
