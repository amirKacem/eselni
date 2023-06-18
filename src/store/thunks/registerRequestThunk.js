import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

const baseRegisterRequestPath = 'api/v1/registration_requests';

export const signUpRequest = createAsyncThunk('request/signUp', async (data, { rejectWithValue }) => {
    try {
        const response = await api.post(baseRegisterRequestPath, data);
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message);
    }
});

export const registrationRequestByStatus = createAsyncThunk('registration/requests', async (status, { rejectWithValue }) => {
    try {
        const response = await api.get(baseRegisterRequestPath + '/status/' + status);
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message);
    }
});

export const findRegistrationRequest = createAsyncThunk('find/registration/requests', async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(baseRegisterRequestPath + '/' + id);
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message);
    }
});

export const updateRegistrationRequest = createAsyncThunk(
    'update/registration/requests',
    async ({ requestId, status }, { rejectWithValue }) => {
        try {
            const response = await api.put(
                baseRegisterRequestPath + '/' + requestId,
                { status: status },
                { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
            );
            console.log(response);
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue(e.message);
        }
    }
);
