import {StyleSheet, View} from 'react-native';
import {useState} from "react";
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {register} from "../../redux-store/userSlice";
import {showToast} from "../../utils/utils";
import {useNavigation} from "@react-navigation/native";
import Colors from '../../Colors';

const RegistrationComponent = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigation();
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.users);

    const registrationHandle = async () => {

        const response = await dispatch(register({firstname, lastname, username, email, password}));
        if (response.error) {
            if (response.error.message === "400") {
                showToast("Username/email must be unique.");
                return;
            }
            showToast("There is some problem with registration.");
            return;
        }
        showToast("You have successfully register");
        nav.goBack();
    };

    const validateForm = () => {
        return (username.length === 0 || password.length === 0 || firstname.length === 0 || lastname.length === 0)
    };

    return (
        <>
            <View style={{
                alignItems: 'center',
            }}>
                <View>
                    <TextInput
                        label={"Firstname"}
                        style={styles.input}
                        placeholder={"Enter your firstname"}
                        onChangeText={setFirstname}
                    />

                    <TextInput
                        label={"Lastname"}
                        style={styles.input}
                        placeholder={"Enter your Lastname"}
                        onChangeText={setLastname}
                    />

                    <TextInput
                        label={"Username"}
                        style={styles.input}
                        placeholder={"Enter your Username"}
                        onChangeText={setUsername}
                    />

                    <TextInput
                        label={"Email"}
                        style={styles.input}
                        placeholder={"Enter your email"}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        label={"Password"}
                        secureTextEntry={true}
                        style={styles.input}
                        placeholder={"Enter your password"}
                        onChangeText={setPassword}
                    />

                    <View style={{margin: 10}}>
                        <Button
                            loading={loading}
                            icon={require("../../assets/images/register.png")}
                            mode={"contained"}
                            onPress={registrationHandle}
                            disabled={validateForm()}
                        > Register </Button>
                    </View>
                </View>
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: Colors.PRIMARY_COLOR,
        width: 300,
    },
    loadingContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
    }
});

export default RegistrationComponent;
