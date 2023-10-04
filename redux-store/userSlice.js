import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import userService from '../api/user.service';
import authService from '../api/auth.service';

export const login = createAsyncThunk("userSlice/login", async ({username, password}) => {
    return await userService.login(username, password);
});

export const status = createAsyncThunk("userSlice/status", async () => {
    return await authService.getStatus();
});

export const register = createAsyncThunk("userSlice/register", async ({
                                                                          firstname,
                                                                          lastname,
                                                                          username,
                                                                          email,
                                                                          password
                                                                      }) => {
    return await userService.registration(firstname, lastname, username, email, password);
});

export const getUserById = createAsyncThunk("userSlice/getUserById", async ({id}) => {
    return await authService.getUserById(id);
});

export const updateUser = createAsyncThunk("userSlice/updateUser", async ({first_name, last_name, email}) => {
    return await authService.updateUserProfile(first_name, last_name, email);
});

export const updatePassword = createAsyncThunk("userSlice/updatePassword", async ({
                                                                                      password,
                                                                                      password_repeat,
                                                                                      password_old
                                                                                  }) => {
    return await authService.updateUserPassword(password, password_repeat, password_old);
});

const logoutAction = (state) => {
    state.authenticated = false;
    state.loading = false;
    state.user = null;
    userService.logout();
};

const updateStateForUserActive = (state, action) => {
    state.loadingActive = true;
    const {id, newActive} = action.payload;
    console.log("newActive", newActive);
    console.log("da", state.userCreated.is_active);
    state.userCreated.is_active = newActive;

    console.log("da", state.userCreated.is_active);
    // const index = state.users.findIndex((item) => item.id === id);
    //
    // if (index !== -1)
    //     state.users[index].is_active = newActive;

    state.loadingActive = false;
};

const updateStateForUserAdmin = (state, action) => {
    state.loadingAdmin = true;
    const {id, newAdmin} = action.payload;

    state.userCreated.is_admin = newAdmin;

    state.loadingAdmin = false;
};

const userSlice = createSlice({
    name: 'users',
    initialState: {
        authenticated: false,
        authenticatedFailed: false,
        loading: false,
        user: null,
        admin: false,
        userCreated: null,
        loadingActive: false,
        loadingAdmin: false,
    },
    reducers: {
        logout: logoutAction,
        updateUsersStateActive: updateStateForUserActive,
        updateUsersStateAdmin: updateStateForUserAdmin
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state) => {
                state.authenticated = true;
                state.authenticatedFailed = false;
                state.loading = false;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.rejected, (state) => {
                state.authenticated = false;
                state.authenticatedFailed = true;
                state.loading = false;
            });

        builder
            .addCase(status.fulfilled, (state, action) => {
                state.authenticated = true;
                state.loading = false;
                state.user = action.payload;
                state.admin = action.payload.is_admin;
            })
            .addCase(status.pending, (state) => {
                state.loading = true;
            })
            .addCase(status.rejected, (state) => {
                state.authenticated = false;
                state.loading = false;
                state.authenticatedFailed = true;
                state.user = null;
                state.admin = false;
            });

        builder
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.rejected, (state) => {
                state.loading = false;
            });

        builder
            .addCase(getUserById.fulfilled, (state, action) => {
                state.userCreated = action.payload;
                state.loading = false;
            })
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserById.rejected, (state) => {
                state.loading = false;
                state.userCreated = null;
            });

        builder
            .addCase(updateUser.fulfilled, (state, action) => {
                // state.user = action.payload;
                state.loading = false;
            })
            .addCase(updateUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
            });

        builder
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updatePassword.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
            });
    }
});

export const {logout, updateUsersStateActive, updateUsersStateAdmin} = userSlice.actions;
export default userSlice.reducer;
