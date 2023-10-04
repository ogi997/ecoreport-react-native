import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import adminService from "../api/admin.service";

export const getAllUsers = createAsyncThunk("admin/getAllUsers", async () => {
    return await adminService.getAllUsers();
});

export const getAllReportProblems = createAsyncThunk("admin/getAllReportProblems", async () => {
    return await adminService.getAllReportProblems();
});

export const activateReportProblemById = createAsyncThunk("admin/activateReportProblemById", async ({id}) => {
    return await adminService.activateReportProblemById(id);
});

export const deactivateReportProblemById = createAsyncThunk("admin/deactivateReportProblemById", async ({id}) => {
    return await adminService.deactivateReportProblemById(id);
});

export const activateUserById = createAsyncThunk("admin/activateUserById", async ({id}) => {
    return await adminService.activateUserById(id);
});

export const setAdminForUserById = createAsyncThunk("admin/setAdminForUserById", async ({id}) => {
    return await adminService.setAdminForUserById(id);
});

export const deactivateUserById = createAsyncThunk("admin/deactivateUserById", async ({id}) => {
    return await adminService.deactivateUserById(id);
});

export const removeAdminForUserById = createAsyncThunk("admin/removeAdminForUserById", async ({id}) => {
    return await adminService.removeAdminForUserById(id);
});

const updateActiveState = (state, action) => {
    state.loading = true;
    const {id} = action.payload;

    const index = state.reportProblems.findIndex((item) => item.id === id);

    if (index !== -1)
        state.reportProblems[index].active = !state.reportProblems[index].active;

    state.loading = false;
};


const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        reportProblems: [],
        loading: false,
    },
    reducers: {
        updateActiveStateReportProblems: updateActiveState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.rejected, (state) => {
                state.loading = false;
            });

        builder
            .addCase(getAllReportProblems.fulfilled, (state, action) => {
                state.reportProblems = action.payload;
                state.loading = false;
            })
            .addCase(getAllReportProblems.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllReportProblems.rejected, (state) => {
                state.loading = false;
            });
        builder
            .addCase(activateReportProblemById.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(activateReportProblemById.pending, (state) => {
                state.loading = true;
            })
            .addCase(activateReportProblemById.rejected, (state) => {
                state.loading = false;
            });

        builder
            .addCase(deactivateReportProblemById.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deactivateReportProblemById.pending, (state) => {
                state.loading = true;
            })
            .addCase(deactivateReportProblemById.rejected, (state) => {
                state.loading = false;
            });

        builder
            .addCase(activateUserById.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(activateUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(activateUserById.rejected, (state) => {
                state.loading = false;
            });

        builder
            .addCase(deactivateUserById.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deactivateUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(deactivateUserById.rejected, (state) => {
                state.loading = false;
            });

        builder
            .addCase(setAdminForUserById.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(setAdminForUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(setAdminForUserById.rejected, (state) => {
                state.loading = false;
            });

        builder
            .addCase(removeAdminForUserById.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(removeAdminForUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeAdminForUserById.rejected, (state) => {
                state.loading = false;
            });
    }
});

export const {updateActiveStateReportProblems,} = adminSlice.actions;

export default adminSlice.reducer;
