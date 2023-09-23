import { Text, View} from 'react-native'
import RegistrationComponent from "../../components/RegistrationComponent/RegistrationComponent";


const RegistrationScreen = () => {
    return (
        <>
            <View style={{
                margin: 10
            }}>
                <Text>Registration page</Text>
            </View>
            <RegistrationComponent />
        </>
    );
}

export default RegistrationScreen;
