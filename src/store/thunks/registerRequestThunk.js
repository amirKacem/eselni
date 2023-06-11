import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

const baseRegisterRequestPath = 'api/v1/registration_requests';

export const signUpRequest = createAsyncThunk('request/signUp', async (data, { rejectWithValue }) => {
    try {
        const response = await api.post(baseRegisterRequestPath, data);
        return data;
    } catch (e) {
        console.log(e);
        return rejectWithValue(e.message);
    }
});

export const registrationRequestByStatus = createAsyncThunk('registration/requests', async (status, { rejectWithValue }) => {
    try {
        const response = await api.get(baseRegisterRequestPath + '/status/' + status);
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue(e.message);
    }
});
