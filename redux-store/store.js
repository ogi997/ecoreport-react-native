import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import choiceReducer from './choiceSlice';
import mapReducer from './mapSlice';
import reportReducer from './reportSlice';
import adminReducer from './adminSlice';
import cameraReducer from './cameraSlice';

export const store = configureStore({
    reducer: {
        users: userReducer,
        choices: choiceReducer,
        map: mapReducer,
        reports: reportReducer,
        admin: adminReducer,
        camera: cameraReducer,
    }
});
