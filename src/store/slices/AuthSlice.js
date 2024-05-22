import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {loginUserRequest} from "../../services/AuthService";

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
        },
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
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;