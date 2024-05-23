import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {authUserRequest, loginUserRequest} from "../../services/AuthService";
import * as SecureStore from "expo-secure-store";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password },{ rejectWithValue }) => {
        try {
            const response =  await loginUserRequest({username, password});
            const {token, ...user} = response;
            return {token, user}
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.message)
                return rejectWithValue({
                    message: error.message,
                    code: error.code,
                    response: error.response?.data
                });
            }
            console.log(error.message)
            return rejectWithValue({ message: error.message });
        }
    }
);


export const authUser = createAsyncThunk(
    'auth/authUser',
    async ({ token },{ rejectWithValue }) => {
        try {
            return await authUserRequest({token});
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.message)
                return rejectWithValue({
                    message: error.message,
                    code: error.code,
                    response: error.response?.data
                });
            }
            return rejectWithValue({ message: error.message });
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = null;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                const {token, user} = action.payload;
                state.user = user;
                state.token = token;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(authUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(authUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
            })
        ;
    },
});
export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;