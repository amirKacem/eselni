import { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from '../authentication/AuthWrapper';
import AuthRegister from '../authentication/auth-forms/AuthRegister';
import PsychologistForm from './form/index';
// redux
import { createPsychologistRequest } from 'store/thunks/psychologistThunk';
import { findRegistrationRequest } from 'store/thunks/registerRequestThunk';
import { signUpRequestSelector } from 'store/slices/signUpRequestSlice';
import { useSelector, useDispatch } from 'react-redux';

// ================================|| REGISTER ||================================ //

const Psychologist = () => {
    //const [hideForm, setHideForm] = useState(false);

    const { isSuccess, isError } = useSelector(signUpRequestSelector);
    const registrationRequest = useSelector((state) => state.registrationRequest.request);

    const hideFormallback = () => {
        console.log('hide forme');
        setHideForm(true);
    };

    return (
        <AuthWrapper>
            <Grid container spacing={4}>
                {isSuccess ? (
                    <Grid item xs={12}>
                        <Typography align="center" size="large" sx={{ color: '#468d41', fontSize: '18px' }}>
                            Your account has been created successfully.
                        </Typography>
                    </Grid>
                ) : (
                    <>
                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                                <Typography variant="h3">Create Your Account</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <PsychologistForm hideForm={hideFormallback} />
                        </Grid>
                    </>
                )}
            </Grid>
        </AuthWrapper>
    );
};

export default Psychologist;
