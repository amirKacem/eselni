import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

const basePsychologistPath = 'api/v1/psychologists';

export const createPsychologistRequest = createAsyncThunk('request/createPsychologist', async (data, { rejectWithValue }) => {
    try {
        const response = await api.post(basePsychologistPath, data);
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message);
    }
});
