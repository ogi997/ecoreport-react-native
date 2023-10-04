import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseConfig = {
    baseURL: 'http://127.0.0.1:8000'
}

const baseService = {
    service: (useAuth) => {
        const instance = axios.create(baseConfig);
        if (useAuth) {
            instance.interceptors.request.use(async (config) => {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    config.headers = {
                        ...config.headers,
                        Authorization: `Bearer ${token}`,
                    };
                }
                return config;
            },
                (error) => {
                    return Promise.reject(error);
                }
            );
        }
        return instance;
    },
};

export default baseService;
