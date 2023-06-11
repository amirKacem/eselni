import { createSlice } from '@reduxjs/toolkit';
import { registrationRequestByStatus } from '../thunks/registerRequestThunk';

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    requests: []
};

export const registrationRequestSlice = createSlice({
    name: 'registrationRequest',
    initialState,
    reducers: {},
    extraReducers: {
        [registrationRequestByStatus.pending]: (state) => {
            state.isLoading = true;
        },
        [registrationRequestByStatus.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.requests = action.payload;
        },
        [registrationRequestByStatus.rejected]: (state) => {
            state.isLoading = false;
            state.isError = true;
        }
    }
});

export const regisrtattionRequestSelector = (state) => state.registrationRequest;
export default registrationRequestSlice.reducer;
