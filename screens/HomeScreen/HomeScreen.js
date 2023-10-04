import {View, StyleSheet, Image} from "react-native";
import {Text} from 'react-native-paper';
import HomeComponent from "../../components/HomeComponent/HomeComponent";
import Colors from '../../Colors';

const HomeScreen = () => {

    return (
        <>
            <View style={styles.container}>
                <Text variant={"headlineLarge"}>Welcome to EcoReport</Text>
                <Image source={require("../../assets/splash.png")} style={styles.image}/>
            </View>
            <HomeComponent />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 85,
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

export default HomeScreen;
