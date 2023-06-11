import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData, login, signOut } from 'store/thunks/authThunk';
// material-ui
import { Grid, List, Stack, TextField, Typography } from '@mui/material';

// project import
import RegistrationRequest from './RegistrationRequestTable';
import MainCard from 'components/MainCard';
import { registrationRequestByStatus } from 'store/thunks/registerRequestThunk';

// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = ({ status }) => {
    const regisrtattionRequests = useSelector((state) => state.registrationRequest.requests);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(registrationRequestByStatus(status));
    }, [status]);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Regisrtation Requests</Typography>
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {/* row 3 */}
            <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <RegistrationRequest rows={regisrtattionRequests} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default DashboardDefault;
