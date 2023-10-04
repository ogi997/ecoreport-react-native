import {StyleSheet} from 'react-native';
import {ActivityIndicator, Button, DataTable} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllUsers} from "../../redux-store/adminSlice";
import {useNavigation} from "@react-navigation/native";
import Colors from '../../Colors';

const UsersComponent = () => {
    const dispatch = useDispatch();
    const {users, loading} = useSelector((state) => state.admin);
    const nav = useNavigation();
    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    const openUserHandle = (id) => {
        nav.navigate("OneUser", {state: {user_id: id}});
    };

    return (
        <>
            <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title>Full name</DataTable.Title>
                    <DataTable.Title>Last name</DataTable.Title>
                    <DataTable.Title>Username</DataTable.Title>
                    <DataTable.Title>Action</DataTable.Title>
                </DataTable.Header>

                {
                    (!loading) ?
                        users.map((item) => (
                            <DataTable.Row key={item.id} style={{borderColor: Colors.TEXT_COLOR}}>
                                <DataTable.Cell>{item.first_name}</DataTable.Cell>
                                <DataTable.Cell>{item.last_name}</DataTable.Cell>
                                <DataTable.Cell>{item.username}</DataTable.Cell>
                                <DataTable.Cell>
                                    <Button
                                        mode={"contained"}
                                        onPress={() => openUserHandle(item.id)}
                                    >
                                        Open
                                    </Button>
                                </DataTable.Cell>
                            </DataTable.Row>


                        )) : <ActivityIndicator style={{marginTop: 20}} size={"large"}/>
                }
            </DataTable>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    tableHeader: {
        backgroundColor: Colors.PRIMARY_COLOR,
        borderColor: Colors.TEXT_COLOR,
    },

});

export default UsersComponent;
