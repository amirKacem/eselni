import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from '../../utils/helpers';
import api from '../../api';

const baseAccountsPath = 'api/v1/accounts';

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await api.post(
            baseAccountsPath + '/login',
            { email, password },
            { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
        );
        if (response.status === 200) {
            setLocalStorageItem('user', response.data);
            return response.data;
        } else {
            return rejectWithValue(response.data);
        }
    } catch (e) {
        console.log('Error', e);
        return rejectWithValue('The email address or password you entered is invalid');
    }
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
    //removeToken();
});
