import {ActivityIndicator, Button, DataTable, IconButton, MD3Colors} from "react-native-paper";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    activateReportProblemById,
    deactivateReportProblemById,
    getAllReportProblems,
    updateActiveStateReportProblems
} from "../../redux-store/adminSlice";
import {View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Colors from '../../Colors';

const ReportsComponent = () => {

    const dispatch = useDispatch();
    const {reportProblems, loading} = useSelector((state) => state.admin);
    const nav = useNavigation();
    useEffect(() => {
        dispatch(getAllReportProblems());
    }, []);

    const deleteHandle = async (id) => {
        await dispatch(deactivateReportProblemById({id}));
        await dispatch(updateActiveStateReportProblems({id}));
    };

    const activateHandle = async (id) => {
        await dispatch(activateReportProblemById({id}));
        await dispatch(updateActiveStateReportProblems({id}));
    };

    const openHandle = async (id) => {
        nav.navigate("OpenReport", {state: {reportID: id, disabledSave: true}});
    }
    return (
        <>
            <View style={{padding: 20}}>
                <DataTable>
                    <DataTable.Header style={{backgroundColor: Colors.PRIMARY_COLOR}}>
                        <DataTable.Title>Title</DataTable.Title>
                        <DataTable.Title>Action</DataTable.Title>
                    </DataTable.Header>

                    {
                        (!loading) ? reportProblems.map((item) => (
                            <DataTable.Row key={item.id}>
                                <DataTable.Cell>{item.title}</DataTable.Cell>
                                <DataTable.Cell>
                                    <View style={{flexDirection: 'row', gap: 15}}>
                                        <Button
                                            mode={"contained"}
                                            title={"Open"}
                                            onPress={() => openHandle(item.id)}
                                        >
                                            Open
                                        </Button>
                                        {
                                            item.active ?
                                                <IconButton
                                                    icon={require("../../assets/images/block.png")}
                                                    mode={"contained"}
                                                    style={{backgroundColor: "#e74c3c"}}
                                                    background={"red"}
                                                    iconColor={MD3Colors.error20}
                                                    size={17}
                                                    onPress={() => deleteHandle(item.id)}
                                                />

                                                : <IconButton
                                                    mode={"contained"}
                                                    style={{backgroundColor: Colors.PRIMARY_COLOR}}
                                                    iconColor={MD3Colors.error20}
                                                    icon={require("../../assets/images/recovery.png")}
                                                    size={17}
                                                    onPress={() => activateHandle(item.id)}
                                                />
                                        }
                                    </View>

                                </DataTable.Cell>
                            </DataTable.Row>
                        )) : <ActivityIndicator style={{marginTop: 20}} size={"large"}/>
                    }
                </DataTable>
            </View>
        </>
    );
}

export default ReportsComponent;
