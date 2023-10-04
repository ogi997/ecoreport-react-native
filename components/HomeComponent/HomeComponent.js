import {StyleSheet, View} from "react-native";
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from "react-redux";
import {logout, status} from '../../redux-store/userSlice';
import {showToast} from "../../utils/utils";
import {Button} from 'react-native-paper';
import Colors from '../../Colors';

const HomeComponent = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {authenticated, admin} = useSelector((state) => state.users);

    const loginHandlePress = () => {
        navigation.navigate('Login');
    };

    const registrationHandlePress = () => {
        navigation.navigate("Registration");
    };

    const mapHandlePress = () => {
        navigation.navigate("Map");
    };

    const reportProblemHandlePress = () => {
        navigation.navigate("ReportProblem");
    };

    const usersHandlePress = () => {
        navigation.navigate("Users");
    };

    const reportsHandle = () => {
        navigation.navigate("Reports");
    };

    const profileHandlePress = () => {
        navigation.navigate("MyProfile");
    };

    const logoutHandlePress = () => {
        dispatch(logout());
        dispatch(status());
        showToast("You have successfully logout");
    };


    return (
        <>
            <View style={styles.container}>
                {(!authenticated) &&
                    <View style={styles.item}>
                        <Button
                            mode={"contained"}
                            icon={require("../../assets/images/login.png")}
                            onPress={loginHandlePress}
                        > Login </Button>
                    </View>
                }
                {(!authenticated) &&
                    <View style={styles.item}>
                        <Button
                            mode={"contained"}
                            icon={require("../../assets/images/register.png")}
                            onPress={registrationHandlePress}
                        > Register </Button>
                    </View>
                }
                <View style={styles.item}>
                    <Button
                        mode={"contained"}
                        icon={require("../../assets/images/map.png")}
                        onPress={mapHandlePress}
                    > Map </Button>
                </View>

                {(authenticated) &&
                    <View style={styles.item}>
                        <Button
                            mode={"contained"}
                            icon={require("../../assets/images/report.png")}
                            onPress={reportProblemHandlePress}
                        > Report </Button>
                    </View>
                }
                {(admin) &&
                    <View style={styles.item}>
                        <Button
                            icon={require("../../assets/images/users.png")}
                            mode={"contained"}
                            onPress={usersHandlePress}
                        > Users </Button>
                    </View>
                }
                {(admin) &&
                    <View style={styles.item}>
                        <Button
                            mode={"contained"}
                            icon={require("../../assets/images/reports.png")}
                            onPress={reportsHandle}
                        > All Reports </Button>
                    </View>
                }

                {
                    (authenticated) &&
                    <View style={styles.item}>
                        <Button
                            icon={require("../../assets/images/profile.png")}
                            mode={"contained"}
                            onPress={profileHandlePress}
                        >
                            Profile
                        </Button>
                    </View>
                }
                {(authenticated) &&
                    <View style={styles.item}>
                        <Button
                            icon={require("../../assets/images/logout.png")}
                            mode={"contained"}
                            onPress={logoutHandlePress}
                        > Logout </Button>
                    </View>
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 40,
        justifyContent: 'space-evenly',
        columnGap: 10,
        rowGap: 50,
        alignItems: 'center',
        backgroundColor: Colors.SECONDARY_COLOR,
    },
    item: {
        width: '40%',
    }
});

export default HomeComponent;
