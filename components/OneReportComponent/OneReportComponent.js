import {useNavigation} from "@react-navigation/native";
import {Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {ActivityIndicator, Button, DataTable, Divider} from "react-native-paper";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {cleanOneReport, getReportProblemById} from "../../redux-store/reportSlice";
import {status} from "../../redux-store/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {showToast} from "../../utils/utils";
import {getAllProblemType, getCities} from "../../redux-store/choiceSlice";
import Colors from '../../Colors'

const OneReportComponent = () => {
    const nav = useNavigation();
    const dispatch = useDispatch();

    const {oneReport} = useSelector((state) => state.reports);
    const {user} = useSelector((state) => state.users);
    const {cities, problemType} = useSelector((state) => state.choices);

    const [loadingUseEffect, setLoadingUseEffect] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoadingUseEffect(true);
            const id = nav.getState().routes[2].params.state.reportID;
            await dispatch(getReportProblemById({id}));
            await dispatch(status());
            await dispatch(getCities());
            await dispatch(getAllProblemType());

            checkIfExist(id);

            setLoadingUseEffect(false);
        };

        getData();

        return () => {
            dispatch(cleanOneReport());
        }
    }, []);

    const saveData = async () => {
        AsyncStorage.getItem('local')
            .then((storedData) => {
                let existingArray = [];
                if (storedData) {
                    existingArray = JSON.parse(storedData);
                }
                const existingIndex = existingArray.findIndex((item) => item.id === oneReport?.id);

                if (existingIndex !== -1) {
                    existingArray.splice(existingIndex, 1);
                    AsyncStorage.setItem('local', JSON.stringify(existingArray))
                        .then(() => {
                            setDisabled(prev => !prev);
                            showToast("You have successfully deleted it.")
                        })
                        .catch((error) => {
                            showToast("ERROR")
                        });
                    return;
                } else {
                    existingArray.push(oneReport);
                }
                AsyncStorage.setItem('local', JSON.stringify(existingArray))
                    .then(() => {
                        showToast("You have successfully added.");
                        setDisabled(prev => !prev);
                    })
                    .catch((error) => {
                        showToast("Doslo je do greske");
                    });
            })
            .catch((error) => {
                showToast("DOslo je do greske");
            });
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const checkIfExist = (exist_id) => {
        AsyncStorage.getItem("local").then((storedData) => {
            let existingArray = [];
            if (storedData) {
                existingArray = JSON.parse(storedData);
            }
            const existingIndex = existingArray.findIndex((item) => item.id === Number(exist_id));
            setDisabled(existingIndex !== -1);
        });
    }

    return (
        <>
            <View style={styles.container}>

                {
                    !loadingUseEffect
                        ?
                        <View>
                            <DataTable style={{width: 380}}>
                                <DataTable.Header>
                                    <DataTable.Title textStyle={{fontSize: 23}}>Information</DataTable.Title>
                                </DataTable.Header>

                                <DataTable.Row>
                                    <DataTable.Cell
                                        textStyle={{fontSize: 18}}>Title: {oneReport?.title}</DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell textStyle={{fontSize: 18}}>Note: {oneReport?.note}</DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell textStyle={{fontSize: 18}}>City: {cities.map((item) => {
                                        if (item.key === oneReport?.city) return item.value
                                    })}</DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell textStyle={{fontSize: 18}}>Category: {problemType.map((item) => {
                                        if (item.key === oneReport?.problem_type) return item.value
                                    })}</DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell textStyle={{fontSize: 18}}>User full
                                        name: {user?.first_name + " " + user?.last_name}</DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell
                                        textStyle={{fontSize: 18}}>Created: {oneReport?.creation_date.split('T')[0] + " " + oneReport?.creation_date.split('T')[1].split('.')[0]}</DataTable.Cell>
                                </DataTable.Row>

                            </DataTable>
                            <View style={{margin: 5}}></View>

                            <TouchableOpacity onPress={() => setModalVisible(prev => !prev)}>
                                <Image style={styles.imageSize} source={{uri: oneReport?.image}}/>
                            </TouchableOpacity>
                            <View style={{margin: 5}}></View>
                            <Divider/>

                            <View style={{margin: 5}}></View>
                            {(!nav.getState().routes[2].params.state.disabledSave) &&
                                <View style={{marginTop: 20}}>
                                    {
                                        <Button
                                            mode={"contained"}
                                            onPress={saveData}
                                        >
                                            {(disabled) ? "Remove" : "Save"}
                                        </Button>
                                    }
                                </View>
                            }
                        </View>

                        :
                        <ActivityIndicator size={"large"}/>
                }
            </View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>

                            <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                                   source={{uri: oneReport?.image}}/>
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        alignSelf: 'center'
    },
    textStyle: {
        fontSize: 21,
        paddingRight: 10,
    },
    imageSize: {
        width: 240,
        height: 140,
        resizeMode: 'cover'
    },
    centeredView: {
        width: '100%',
        height: '100%',
    },
    modalView: {
        backgroundColor: Colors.PRIMARY_COLOR,
        padding: 6,
        alignItems: 'flex-end',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default OneReportComponent;
