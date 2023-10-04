import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import reportService from "../api/report.service";

export const getReportProblemById = createAsyncThunk("reports/getReportProblemById", async ({id}) => {
    return await reportService.getReportById(id);
});

const cleaning = (state) => {
    state.oneReport = null;
};

const reportSlice = createSlice({
    name: 'reports',
    initialState: {
        loading: false,
        oneReport: null,
    },
    reducers: {
        cleanOneReport: cleaning,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReportProblemById.fulfilled, (state, action) => {
                state.oneReport = {
                    id: action.payload.id,
                    geometry: action.payload.geometry,
                    ...action.payload.properties
                };
                state.loading = false;
            })
            .addCase(getReportProblemById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getReportProblemById.rejected, (state) => {
               state.loading = false;
               state.oneReport = null;
            });

    }
});

export const {cleanOneReport} = reportSlice.actions;

export default reportSlice.reducer;