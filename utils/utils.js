import {ToastAndroid} from "react-native";

export const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
};

const methods = {
    showToast,
}

export default methods;
