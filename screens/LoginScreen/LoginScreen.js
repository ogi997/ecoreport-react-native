import {Image, StyleSheet, View} from "react-native";
import LoginComponent from "../../components/LoginComponent/LoginComponent";
import Colors from "../../Colors";


const LoginScreen = () => {

    return (
        <>
            <View style={styles.container}>
                <Image source={require("../../assets/images/loginPage.png")} style={styles.image}/>
            </View>
            <LoginComponent/>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        padding: 25,
        backgroundColor: Colors.SECONDARY_COLOR,
    },
    image: {
        marginTop: 50,
        alignSelf: 'center',
        width: 100,
        height: 100,
    }
});

export default LoginScreen;
