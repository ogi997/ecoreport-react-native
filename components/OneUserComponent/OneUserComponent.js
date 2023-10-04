import {useEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {getUserById, updateUsersStateActive, updateUsersStateAdmin} from "../../redux-store/userSlice";
import {View} from "react-native";
import {ActivityIndicator, Button, DataTable} from 'react-native-paper';
import {
    activateUserById,
    deactivateUserById,
    removeAdminForUserById,
    setAdminForUserById
} from "../../redux-store/adminSlice";

const OneUserComponent = () => {
    const dispatch = useDispatch();
    const nav = useNavigation();
    const {userCreated, loading, loadingActive, loadingAdmin} = useSelector((state) => state.users);
    useEffect(() => {
        const getData = async () => {
            const id = nav.getState().routes[2].params.state.user_id;

            await dispatch(getUserById({id}));
        };

        getData();
    }, []);

    const blockHandle = async (id) => {
        await dispatch(deactivateUserById({id}));
        await dispatch(updateUsersStateActive({id, newActive: false}));
    };

    const unblockHandle = async (id) => {
        await dispatch(activateUserById({id}));
        await dispatch(updateUsersStateActive({id, newActive: true}));
    };

    const makeAdminHandle = async (id) => {
        await dispatch(setAdminForUserById({id}));
        await dispatch(updateUsersStateAdmin({id, newAdmin: true}));
    };

    const removeAdminHandle = async (id) => {
        await dispatch(removeAdminForUserById({id}));
        await dispatch(updateUsersStateAdmin({id, newAdmin: false}));
    }

    return (
        <>
            {(!loading) ?
                <View style={{padding: 30}}>

                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title textStyle={{fontSize: 23}}>Information</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row>
                            <DataTable.Cell
                                textStyle={{fontSize: 18}}>Firstname: {userCreated?.first_name}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell
                                textStyle={{fontSize: 18}}>Lastname: {userCreated?.last_name}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell
                                textStyle={{fontSize: 18}}>Username: {userCreated?.username}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell textStyle={{fontSize: 18}}>Email: {userCreated?.email}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell textStyle={{fontSize: 18}}>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        gap: 20,
                                    }}
                                >
                                    {(userCreated?.is_active) ?
                                        <Button
                                            loading={loadingActive}
                                            icon={require("../../assets/images/block.png")}
                                            mode={"contained"}
                                            onPress={() => blockHandle(userCreated?.id)}
                                        >
                                            Block
                                        </Button>
                                        :
                                        <Button
                                            loading={loadingActive}
                                            icon={require("../../assets/images/unblock.png")}
                                            mode={"contained"}
                                            onPress={() => unblockHandle(userCreated?.id)}
                                        >
                                            Unblock
                                        </Button>}
                                    {(!userCreated?.is_admin) ?
                                        <Button
                                            loading={loadingAdmin}
                                            icon={require("../../assets/images/makeAdmin.png")}
                                            mode={"contained"}
                                            onPress={() => makeAdminHandle(userCreated?.id)}
                                        >
                                            Make admin
                                        </Button>
                                        :
                                        <Button
                                            loading={loadingAdmin}
                                            icon={require("../../assets/images/deleteAdmin.png")}
                                            mode={"contained"}
                                            onPress={() => removeAdminHandle(userCreated?.id)}
                                        >
                                            Remove admin
                                        </Button>}
                                </View>
                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View> :
                <ActivityIndicator style={{
                    position: 'absolute',
                    top: '40%',
                    left: '38%',
                }} size={100} animating={true}/>
            }
        </>
    );
}

export default OneUserComponent;
