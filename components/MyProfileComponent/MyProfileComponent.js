import {StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {status, updateUser} from '../../redux-store/userSlice';
import {ActivityIndicator, Button, Checkbox, TextInput} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {showToast} from "../../utils/utils";
import Colors from '../../Colors';
import ChangePasswordComponent from "../ChangePasswordComponent/ChangePasswordComponent";

const MyProfileComponent = () => {

    const [visibleModal, setVisibleModal] = useState(false);
    const dispatch = useDispatch();
    const nav = useNavigation();
    const {user, loading} = useSelector((state) => state.users);

    const [first_name, setFirstname] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {

        const getData = async () => {

            await dispatch(status());
        };

        getData().then(() => {
            setFirstname(user.first_name);
            setLastName(user.last_name);
            setEmail(user.email);
        });
    }, []);

    const updateHandle = async () => {
        dispatch(updateUser({first_name, last_name, email}));
        showToast("You have successfully updated your profile.")
        nav.goBack();
    };

    const validateForm = () => {
        return (first_name.length === 0 && last_name.length === 0 && email.length === 0);
    }

    return (
        <>
            <View style={styles.container}>
                {
                    (!loading) ?
                        <View>
                            <TextInput contentStyle={styles.textInput} onChangeText={setFirstname} on
                                       style={{width: 350}} label={"First name"} defaultValue={user?.first_name}/>
                            <TextInput contentStyle={styles.textInput} style={{width: 350}} label={"Last name"}
                                       value={user?.last_name}/>
                            <TextInput contentStyle={styles.textInput} style={{width: 350}} label={"Email"}
                                       value={user?.email}/>

                            <View style={{marginTop: 10}}>
                                <Button
                                    icon={require("../../assets/images/update.png")}
                                    disabled={validateForm()}
                                    mode={"contained"}
                                    onPress={updateHandle}
                                >
                                    Update
                                </Button>
                            </View>

                            <View style={{marginTop: 10}}>
                                <Text style={{fontSize: 17}}>Date
                                    joined: {user.date_joined.split('T')[0] + " " + user.date_joined.split('T')[1].split('.')[0]}</Text>
                                <Text>Admin:
                                    <Checkbox disabled={true} status={user.is_admin ? "checked" : "unchecked"}/>
                                </Text>
                            </View>

                            <View style={{marginTop: 10}}>
                                <Button
                                    icon={require("../../assets/images/changePassword.png")}
                                    mode={"contained"}
                                    onPress={() => setVisibleModal(true)}
                                >
                                    Change password
                                </Button>
                            </View>
                        </View>
                        :
                        <ActivityIndicator size={"large"}/>
                }
            </View>

            <ChangePasswordComponent visibleModal={visibleModal} setVisibleModal={setVisibleModal}/>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 50,
    },
    textInput: {
        backgroundColor: Colors.PRIMARY_COLOR,
    }
});

export default MyProfileComponent;
