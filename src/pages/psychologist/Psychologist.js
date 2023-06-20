import { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from '../authentication/AuthWrapper';
import AuthRegister from '../authentication/auth-forms/AuthRegister';
import PsychologistForm from './form/index';

// ================================|| REGISTER ||================================ //

const Psychologist = () => {
    const [hideForm, setHideForm] = useState(false);

    const hideFormallback = () => {
        setHideForm(true);
    };

    return (
        <AuthWrapper>
            <Grid container spacing={4}>
                {hideForm ? (
                    <Grid item xs={12}>
                        <Typography align="center" size="large" sx={{ color: '#468d41', fontSize: '18px' }}>
                            Your Registration Request Has Been Sent
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
