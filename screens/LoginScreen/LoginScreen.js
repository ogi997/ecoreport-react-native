import {Text, View} from "react-native";
import LoginComponent from "../../components/LoginComponent/LoginComponent";


const LoginScreen = () => {

    return (
        <>
            <View style={{
                margin: 10
            }}>
                <Text>Login page</Text>
            </View>
            <LoginComponent />
        </>
    );
}

export default LoginScreen;
