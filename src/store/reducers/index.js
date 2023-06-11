// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import authSlice from '../slices/authSlice';
import signUpRequestSlice from '../slices/signUpRequestSlice';
import registrationRequestSlice from '../slices/registrationRequestSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
    menu,
    auth: authSlice,
    signUpRequest: signUpRequestSlice,
    registrationRequest: registrationRequestSlice
});

export default reducers;
