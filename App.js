import { StyleSheet, Text, View } from 'react-native';
import RegistrationScreen from "./screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import ReportProblemScreen from "./screens/ReportProblemScreen/ReportProblemScreen";
import MapScreen from "./screens/MapScreen/MapScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CameraComponent from "./components/CameraComponent/CameraComponent";
import GetLocationProblemComponent from "./components/GetLocationProblemComponent/GetLocationProblemComponent";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <>
          <NavigationContainer>
              <Stack.Navigator>
                  <Stack.Screen
                      name="Home"
                      component={HomeScreen}
                  />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Registration" component={RegistrationScreen} />
                  <Stack.Screen name="ReportProblem" component={ReportProblemScreen} />
                  <Stack.Screen name="Map" component={MapScreen} />
                  <Stack.Screen name={"GetLocation"} component={GetLocationProblemComponent} />
                  <Stack.Screen name={"Camera"} component={CameraComponent} />
              </Stack.Navigator>
          </NavigationContainer>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
