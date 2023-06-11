import { createSlice } from '@reduxjs/toolkit';
import { login, signOut } from '../thunks/authThunk';

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    user: {}
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isSuccess = false;
        }
    },
    extraReducers: {
        [signOut.fulfilled]: (state) => {
            state.isLoading = false;
            state.user = {};
        },
        [login.pending]: (state) => {
            state.isLoading = true;
        },
        [login.fulfilled]: (state, action) => {
            const data = action.payload;
            state.user = data;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        }
    }
});

export const userSelector = (state) => state.auth;
export const { logout } = authSlice.actions;
export default authSlice.reducer;
