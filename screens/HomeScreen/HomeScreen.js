import {Button, Text, View} from "react-native";
import HomeComponent from "../../components/HomeComponent/HomeComponent";


const HomeScreen = () => {

    return (
        <>
            <View style={{margin: 10}}>
                <Text>Dobrodosli na ecoreport</Text>

                {/*<Button title={"Login"}></Button>*/}
            </View>
            <HomeComponent />
        </>
    );
}

export default HomeScreen;
