import {createSlice} from "@reduxjs/toolkit";

const takePhoto = (state, action) => {
    state.photo = action.payload;
}

const cameraSlice = createSlice({
    name: "camera",
    initialState: {
        photo: null
    },
    reducers: {
        savePhoto: takePhoto,
    },
});

export const {savePhoto} = cameraSlice.actions;

export default cameraSlice.reducer;
