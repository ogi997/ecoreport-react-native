import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import choicesService from "../api/choices.service";

export const getCities = createAsyncThunk("choices/cities", async () => {
    return await choicesService.getCities();
});

export const getProblemTypeForFilter = createAsyncThunk("choice/getProblemTypeForFilter", async () => {
    return await choicesService.getProblemTypes();
});

export const getAllProblemType = createAsyncThunk("choices/getAllProblemType", async () => {
    return await choicesService.getProblemTypes();
});

const processData = (data) => {
    const array = [];
    data.forEach((item) => {
        array.push({key: item.code, value: item.name});
    });

    return array;
};

const processDataForFilter = (data) => {
    const array = [];
    array.push({key: "SVI", value: "Show all"});
    data.forEach((item) => {
        array.push({key: item.code, value: item.name});
    });
    return array;
}


const choiceSlice = createSlice({
    name: "choices",
    initialState: {
        cities: [],
        problemType: [],
        loading: false,
        problemTypeAdd: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCities.fulfilled, (state, action) => {
                state.cities = processData(action.payload);
                state.loading = false;
            })
            .addCase(getCities.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCities.rejected, (state) => {
                state.cities = [];
                state.loading = false;
            });

        builder
            .addCase(getProblemTypeForFilter.fulfilled, (state, action) => {
                state.problemType = processDataForFilter(action.payload);
                state.loading = false;
            })
            .addCase(getProblemTypeForFilter.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProblemTypeForFilter.rejected, (state) => {
                state.loading = false;
                state.problemType = [];
            });

        builder
            .addCase(getAllProblemType.fulfilled, (state, action) => {
                state.problemTypeAdd = processData(action.payload);
                state.loading = false;
            })
            .addCase(getAllProblemType.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProblemType.rejected, (state) => {
                state.loading = false;
                state.problemTypeAdd = [];
            });
    }
});

export default choiceSlice.reducer;
