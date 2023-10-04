import base from './base.service';
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = base.service(false);

export const login = (username, password) => {
    return instance
        .post("users/login/", {username, password})
        .then(async (res) => {
            const {access} = res.data;
           await AsyncStorage.setItem("token", access);
           return res.data;
        })
        .catch((error) => Promise.reject(error.response.status));
};

export const registration = (first_name, last_name, username, email, password) => {
    return instance
        .post("users/register/", {first_name, last_name, username, email, password})
        .then((result) => result.data)
        .catch((error) => Promise.reject(error.response.status));
}

export const logout = () => {
    try {
        AsyncStorage.removeItem("token").then((res) => res);
    } catch (error) {
        return Promise.resolve(error);
    }
};


const user = {
    login,
    logout,
    registration,
}

export default user;
