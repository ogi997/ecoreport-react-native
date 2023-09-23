import {Text, View} from "react-native";
import ReportProblemComponent from "../../components/ReportProblemComponent/ReportProblemComponent";


const ReportProblemScreen = () => {
    return (
        <>
            <View style={{
                margin: 10
            }}>
                <Text>ReportProblemPage</Text>
            </View>
            <ReportProblemComponent />
        </>
    );
}

export default ReportProblemScreen;
