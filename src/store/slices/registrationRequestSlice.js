import { createSlice } from '@reduxjs/toolkit';
import { registrationRequestByStatus, findRegistrationRequest } from '../thunks/registerRequestThunk';

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    requests: [],
    request: {}
};

export const registrationRequestSlice = createSlice({
    name: 'registrationRequest',
    initialState,
    reducers: {
        updateRequestStatus: (state, status) => {
            console.log(status, state);
            state.request.status = status;
            console.log(status, state);
        }
    },
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
        },
        [findRegistrationRequest.pending]: (state) => {
            state.isLoading = true;
        },
        [findRegistrationRequest.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.request = action.payload;
        },
        [findRegistrationRequest.rejected]: (state) => {
            state.isLoading = false;
            state.isError = true;
        }
    }
});

export const regisrtattionRequests = (state) => state.registrationRequest.requests;
export const getRegistrationRequest = (state, id) => state.registrationRequest;

export const regisrtattionRequestSelector = (state) => state.registrationRequest;
export const { updateRequestStatus } = registrationRequestSlice.actions;
export default registrationRequestSlice.reducer;
