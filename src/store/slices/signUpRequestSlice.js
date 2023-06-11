import { createSlice } from '@reduxjs/toolkit';
import { signUpRequest, registrationRequestByStatus } from '../thunks/registerRequestThunk';

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false
};

export const signUpRequestSlice = createSlice({
    name: 'signUpRequest',
    initialState,
    reducers: {},
    extraReducers: {
        [signUpRequest.pending]: (state, action) => {
            state.isLoading = true;
        },
        [signUpRequest.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
        },
        [signUpRequest.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
        }
    }
});

export const signUpRequestSelector = (state) => state.signUpRequest;
export default signUpRequestSlice.reducer;
