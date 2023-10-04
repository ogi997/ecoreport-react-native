import {StyleSheet, View} from "react-native";
import {Button, TextInput} from 'react-native-paper';
import {useState} from "react";
import Colors from '../../Colors';
import {login, status} from '../../redux-store/userSlice';
import {useDispatch, useSelector} from "react-redux";
import {showToast} from '../../utils/utils';
import {useNavigation} from "@react-navigation/native";

const LoginComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigation();
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.users);

    const loginHandle = async () => {
        const response = await dispatch(login({username, password}));

        if (response.error !== undefined) {
            if (response.error.message === "401") {
                return showToast('Username/password incorrect');

            }
        }
        showToast("You have successfully logged");
        dispatch(status());
        nav.goBack();
    }
    return (
        <>
            <View
                style={{
                    justifyContent: 'center',
                    padding: 50,
                }}>
                <View>
                    <TextInput style={styles.textInput}
                               label={"Username"}
                               placeholder={"Enter your username"}
                               onChangeText={setUsername}
                    />

                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        label={"Password"}
                        placeholder={"Enter your password"}
                        onChangeText={setPassword}
                    />

                    <View style={{margin: 10}}>
                        <Button
                            icon={require("../../assets/images/login.png")}
                            loading={loading}
                            mode={"contained"}
                            onPress={loginHandle}
                            disabled={(username.length === 0 || password.length === 0)}
                        > Login </Button>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
    },
    textInput: {
        backgroundColor: Colors.PRIMARY_COLOR,
    }
});

export default LoginComponent;
