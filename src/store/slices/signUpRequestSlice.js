import { createSlice } from '@reduxjs/toolkit';
import { signUpRequest } from '../thunks/registerRequestThunk';
import { createPsychologistRequest } from '../thunks/psychologistThunk';

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
        [signUpRequest.pending]: (state) => {
            state.isLoading = true;
        },
        [signUpRequest.fulfilled]: (state) => {
            state.isLoading = false;
            state.isSuccess = true;
        },
        [signUpRequest.rejected]: (state) => {
            state.isLoading = false;
            state.isError = true;
        },
        [createPsychologistRequest.pending]: (state) => {
            state.isLoading = true;
        },
        [createPsychologistRequest.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
        },
        [createPsychologistRequest.rejected]: (state) => {
            state.isLoading = false;
            state.isError = true;
        }
    }
});

export const signUpRequestSelector = (state) => state.signUpRequest;
export default signUpRequestSlice.reducer;
