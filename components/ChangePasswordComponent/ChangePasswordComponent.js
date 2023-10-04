import {Button, Modal, TextInput} from "react-native-paper";
import Colors from "../../Colors";
import {StyleSheet, Text, View} from "react-native";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {updatePassword} from "../../redux-store/userSlice";
import {showToast} from "../../utils/utils";

const ChangePasswordComponent = ({visibleModal, setVisibleModal}) => {

    const [password, setPassword] = useState("");
    const [password_repeat, setPasswordRepeat] = useState("");
    const [password_old, setPasswordOld] = useState("");

    const dispatch = useDispatch();
    const nav = useNavigation();

    const validateForm = () => {
        return (password.length === 0 || password_repeat.length === 0 || password_old.length === 0);
    };

    const changePasswordHandle = async () => {
        const response = await dispatch(updatePassword({password, password_repeat, password_old}));

        showToast("You have successfully changed password.");
        setVisibleModal(false);
        nav.goBack();
    };

    return (
        <>
            <Modal
                style={{
                    position: 'absolute',
                    top: '-30%',
                    padding: 30,
                }}
                contentContainerStyle={{
                    backgroundColor: Colors.PRIMARY_COLOR,
                    padding: 20,
                }}
                visible={visibleModal}
                onDismiss={() => setVisibleModal(false)}
            >
                <Text
                    style={{
                        padding: 'absolute',
                        left: '85%',
                        fontSize: 16
                    }}
                    onPress={() => setVisibleModal(false)}
                >
                    Close</Text>

                <View style={{
                    marginTop: 20,
                }}>
                    <TextInput
                        onChangeText={setPassword}
                        contentStyle={styles.textInput}
                        label={"New password"}
                    />

                    <TextInput
                        onChangeText={setPasswordRepeat}
                        contentStyle={styles.textInput}
                        label={"Repeat new password"}
                    />

                    <TextInput
                        onChangeText={setPasswordOld}
                        contentStyle={styles.textInput}
                        label={"Old password"}
                    />

                </View>

                <View style={{
                    marginTop: 20
                }}>
                    <Button
                        icon={require("../../assets/images/update.png")}
                        disabled={validateForm()}
                        mode={"contained"}
                        onPress={changePasswordHandle}
                    >
                        Change password
                    </Button>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: Colors.PRIMARY_COLOR,
    }
})

export default ChangePasswordComponent;
