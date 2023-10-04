import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import mapNotLoggedService from '../api/mapNotLogged.service';
import mapLoggedService from "../api/mapLogged.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMapDataNotLogged = createAsyncThunk("map/getMapDataNotLogged", async () => {
    return await mapNotLoggedService.getData();
});

export const getMapLogged = createAsyncThunk("map/getMapLogged", async () => {
    return await mapLoggedService.getData();
});

export const getFilteredData = createAsyncThunk("reports/getFilteredData", async ({val}) => {
    return await mapLoggedService.getFilteredData(val);
});

export const createNewProblem = createAsyncThunk("reports/createNewProblem", async ({
                                                                                        value,
                                                                                        type
                                                                                    }, {rejectWithValue}) => {
    return await mapLoggedService.createProblem(value);
});

export const getDataOffline = createAsyncThunk("reports/getDataOffline", async () => {
    return await AsyncStorage.getItem("local").then((storedData) => storedData).catch((err) => err);
});

const processData = (data) => {
    const returnData = [];
    data.forEach((item) => {
        returnData.push({
            id: item.id,
            location: {latitude: item.geometry.coordinates[0], longitude: item.geometry.coordinates[1]},
            title: item.properties.title,
            description: item.properties.note,
        });
    });
    return returnData;
};


const cleaningData = (state) => {
    state.data = [];
    state.loading = false;
}

const mapSlice = createSlice({
    name: 'map',
    initialState: {
        data: [],
        loading: false
    },
    reducers: {
        clearData: cleaningData,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMapDataNotLogged.fulfilled, (state, action) => {
                state.data = processData(action.payload.features);
                state.loading = false;
            })
            .addCase(getMapDataNotLogged.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMapDataNotLogged.rejected, (state) => {
                state.loading = false;
                state.data = [];
            });

        builder
            .addCase(getMapLogged.fulfilled, (state, action) => {
                state.data = processData(action.payload.features);
                state.loading = false;
            })
            .addCase(getMapLogged.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMapLogged.rejected, (state) => {
                state.loading = false;
                state.data = [];
            });

        builder
            .addCase(getFilteredData.fulfilled, (state, action) => {
                state.data = processData(action.payload.features);
                state.loading = false;
            })
            .addCase(getFilteredData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFilteredData.rejected, (state) => {
                state.loading = false;
                state.data = [];
            });

        builder
            .addCase(createNewProblem.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createNewProblem.pending, (state) => {
                state.loading = true;
            })
            .addCase(createNewProblem.rejected, (state) => {
                state.loading = false;
            });

        builder
            .addCase(getDataOffline.fulfilled, (state, action) => {
                const data = JSON.parse(action.payload);
                if (data) {
                    const arrayToProcess = [];
                    data.forEach((item) => {
                        const dataToProcess = {
                            id: item.id,
                            geometry: item.geometry,
                            properties: {
                                title: item.title,
                                note: item.note,
                            },
                        };

                        arrayToProcess.push(dataToProcess);
                    })

                    state.data = processData(arrayToProcess);
                    state.loading = false;
                } else {
                    state.data = [];
                    state.loading = false;
                }

            })
            .addCase(getDataOffline.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDataOffline.rejected, (state) => {
                state.loading = false;
                state.data = [];
            });
    }
});

export const {clearData} = mapSlice.actions;

export default mapSlice.reducer;
