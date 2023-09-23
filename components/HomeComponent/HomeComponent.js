import {Button, ScrollView, Text, View} from "react-native";
import { useNavigation } from '@react-navigation/native';

const HomeComponent = () => {
    const navigation = useNavigation();
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


    return (
        <>
        <View style={{
            flex: 1,
            flexDirection: 'row',
            height: '100%',
            width: '100%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
        }}>
            <Button
                title={"Login"}
                onPress={loginHandlePress}
            />
            <Button
                title={"Registration"}
                onPress={registrationHandlePress}
            />
            <Button
                title={"Map"}
                onPress={mapHandlePress}
            />
            <Button
                title={"Report problem"}
                onPress={reportProblemHandlePress}
            />
        </View>


</>
);
}

export default HomeComponent;
