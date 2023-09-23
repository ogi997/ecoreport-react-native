import {Text, SafeAreaView, View, TextInput, StyleSheet, Button} from "react-native";
import {useState} from "react";

const LoginComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginHandle = () => {
        console.log(username + " " + password);
    }
    return (
        <>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
            }}>
                <SafeAreaView>
                    <Text>Username:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={"Enter your username"}
                        onChangeText={setUsername}
                    />

                    <Text>Password:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={"Enter your password"}
                        onChangeText={setPassword}
                    />

                    <View style={{margin: 10}}>
                        <Button
                            title={"Login"}
                            onPress={loginHandle}
                            disabled={(username.length === 0 || password.length === 0)}
                        />
                    </View>
                </SafeAreaView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        //width: '100%',
       // margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default LoginComponent;
