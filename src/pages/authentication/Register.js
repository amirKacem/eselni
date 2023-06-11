import { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from './AuthWrapper';
import AuthRegister from './auth-forms/AuthRegister';

// ================================|| REGISTER ||================================ //

const Register = () => {
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
                            Your Regisrtation Request Has Been Sent
                        </Typography>
                    </Grid>
                ) : (
                    <>
                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                                <Typography variant="h3">Registeration Request</Typography>
                                <Typography component={Link} to="/login" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                                    Sign In
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <AuthRegister hideForm={hideFormallback} />
                        </Grid>
                    </>
                )}
            </Grid>
        </AuthWrapper>
    );
};

export default Register;
