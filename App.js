import RegistrationScreen from "./screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import ReportProblemScreen from "./screens/ReportProblemScreen/ReportProblemScreen";
import MapScreen from "./screens/MapScreen/MapScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CameraComponent from "./components/CameraComponent/CameraComponent";
import GetLocationProblemComponent from "./components/GetLocationProblemComponent/GetLocationProblemComponent";
import {store} from "./redux-store/store";
import {Provider} from "react-redux";
import OneReportComponent from "./components/OneReportComponent/OneReportComponent";
import UsersComponent from './components/UsersComponent/UsersComponent';
import ReportsComponent from "./components/ReportsComponent/ReportsComponent";
import OneUserComponent from "./components/OneUserComponent/OneUserComponent";
import Colors from './Colors';
import MyProfileComponent from "./components/MyProfileComponent/MyProfileComponent";

const Stack = createNativeStackNavigator();

export default function App() {

    const MyTheme = {
        dark: false,
        colors: {
            primary: Colors.SECONDARY_COLOR,
            background: Colors.SECONDARY_COLOR,
            card: Colors.PRIMARY_COLOR,
            text: '#000',
            border: '#cecece',
            notification: '#cecece',
        },
    };


    return (
        <>
            <Provider store={store}>
                <NavigationContainer theme={MyTheme}>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                        />
                        <Stack.Screen name="Login" component={LoginScreen} options={{
                            title: "Login page"
                        }}/>
                        <Stack.Screen name="Registration" component={RegistrationScreen} options={{
                            title: "Registration page"
                        }}/>
                        <Stack.Screen name="ReportProblem" component={ReportProblemScreen} options={{
                            title: "Report a problem"
                        }}/>
                        <Stack.Screen name="Map" component={MapScreen}/>
                        <Stack.Screen name={"GetLocation"} component={GetLocationProblemComponent} options={{
                            title: "Select a location"
                        }}/>
                        <Stack.Screen name={"Camera"} component={CameraComponent}/>
                        <Stack.Screen name={"OpenReport"} component={OneReportComponent} options={{
                            title: "Report"
                        }}/>
                        <Stack.Screen name={"Users"} component={UsersComponent}/>
                        <Stack.Screen name={"Reports"} component={ReportsComponent}/>
                        <Stack.Screen name={"OneUser"} component={OneUserComponent} options={{
                            title: "User"
                        }}/>
                        <Stack.Screen name={"MyProfile"} component={MyProfileComponent} options={{
                            title: "My profile"
                        }}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        </>
    );
}
