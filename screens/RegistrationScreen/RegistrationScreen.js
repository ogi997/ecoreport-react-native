import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import RegistrationComponent from "../../components/RegistrationComponent/RegistrationComponent";
import Colors from "../../Colors";


const RegistrationScreen = () => {
    return (
        <>
            <View style={styles.container}>
                <Text style={{alignSelf: 'center'}} variant={"headlineLarge"}>Register page</Text>
            </View>
            <RegistrationComponent/>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        padding: 10,
        backgroundColor: Colors.SECONDARY_COLOR,
    },
    image: {
        marginTop: 50,
        alignSelf: 'center',
        width: 100,
        height: 100,
    }
});

export default RegistrationScreen;
