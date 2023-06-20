import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// redux
import { signUpRequest } from 'store/thunks/registerRequestThunk';
import { findRegistrationRequest } from 'store/thunks/registerRequestThunk';
import { signUpRequestSelector } from 'store/slices/signUpRequestSlice';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import {
    Button,
    FormHelperText,
    Grid,
    Link,
    InputAdornment,
    IconButton,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';

// third party
import * as Yup from 'yup';
import { Formik, FieldArray } from 'formik';
import { DateField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { toBase64 } from 'utils/helpers/index';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const Input = styled('input')({
    display: 'none'
});

const PsychologistForm = ({ hideForm }) => {
    let { requestId } = useParams();
    const registrationRequest = useSelector((state) => state.registrationRequest.request);
    const dispatch = useDispatch();
    const { isSuccess, isError } = useSelector(signUpRequestSelector);
    const [error, setError] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    console.log(registrationRequest);
    useEffect(() => {
        dispatch(findRegistrationRequest(requestId));
    }, []);

    useEffect(() => {
        if (isError) {
            setError('An Error Has Been Occured');
        }
    }, [isError]);

    if (isSuccess) {
        hideForm();
    }
    return (
        <>
            <Formik
                initialValues={{
                    email: registrationRequest.email,
                    password: '',
                    hourlyRate: 0,
                    city: '',
                    address: '',
                    image: '',
                    bankAccount: {
                        IBAN: '',
                        fullName: '',
                        bank: ''
                    },

                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                    bankAccount: Yup.object().shape({
                        IBAN: Yup.number().required(),
                        bank: Yup.string().required(),
                        fullName: Yup.string().required()
                    })
                })}
                onSubmit={async (values) => {
                    //await dispatch(signUpRequest(values));
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        {error && (
                            <Grid item xs={12}>
                                <Typography paragraph={true} align="center" color="error">
                                    {error}
                                </Typography>
                            </Grid>
                        )}

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        id="email-login"
                                        type="email"
                                        value={registrationRequest.email}
                                        readOnly={true}
                                        disabled={true}
                                        name="email"
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="-password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="Enter password"
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstname-city">City*</InputLabel>
                                    <OutlinedInput
                                        id="city"
                                        type="text"
                                        value={values.city}
                                        name="city"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="City"
                                        fullWidth
                                        error={Boolean(touched.city && errors.city)}
                                    />
                                    {touched.city && errors.city && (
                                        <FormHelperText error id="helper-text-city">
                                            {errors.city}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstname-signup">Address*</InputLabel>
                                    <OutlinedInput
                                        id="address-psy"
                                        type="text"
                                        value={values.address}
                                        name="address"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Address"
                                        fullWidth
                                        error={Boolean(touched.address && errors.address)}
                                    />
                                    {touched.address && errors.address && (
                                        <FormHelperText error id="helper-text-address">
                                            {errors.address}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item md={6}>
                                <Stack direction="row" justifyContent="center" spacing={2}>
                                    <Button
                                        component="label"
                                        variant="outlined"
                                        startIcon={<UploadFileIcon />}
                                        sx={{ marginRight: '1rem', marginTop: '2rem' }}
                                    >
                                        Upload Image
                                        <Input
                                            name="image"
                                            accept="image/*"
                                            id="contained-button-file"
                                            type="file"
                                            onChange={(e) => {
                                                toBase64(e.target.files[0]).then((data) => {
                                                    var base64String = btoa(data);
                                                    setFieldValue(`image`, base64String);
                                                });
                                            }}
                                        />
                                    </Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="hourlyRate-signup">Hourly Rate(DT) *</InputLabel>
                                    <OutlinedInput
                                        id="hourlyRate-psy"
                                        type="number"
                                        value={values.hourlyRate}
                                        name="hourlyRate"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Hourly Rate"
                                        fullWidth
                                        error={Boolean(touched.hourlyRate && errors.hourlyRate)}
                                    />
                                    {touched.address && errors.hourlyRate && (
                                        <FormHelperText error id="helper-text-address">
                                            {errors.hourlyRate}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Typography sx={{ mt: 5 }} variant="h4">
                                Bank Account:
                            </Typography>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstname-signup">Full Name*</InputLabel>
                                    <OutlinedInput
                                        id="firstname-login"
                                        type="text"
                                        value={values.firstname}
                                        name="bankAccount.fullname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="John"
                                        fullWidth
                                    />
                                    {touched.firstname && errors.firstname && (
                                        <FormHelperText error id="helper-bankAccount-fullName">
                                            {errors.firstname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstname-signup">Bank Name*</InputLabel>
                                    <OutlinedInput
                                        id="bank-name"
                                        type="text"
                                        value={values.firstname}
                                        name="bankAccount.bank"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Bank"
                                        fullWidth
                                        //error={Boolean(touched.bankAccount.bank && errors.bankAccount.bank)}
                                    />
                                    {touched.bankAccount && errors.bankAccount.bank && (
                                        <FormHelperText error id="helper-bank-name">
                                            {errors.bankAccount.bank}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstname-signup">IBAN*</InputLabel>
                                    <OutlinedInput
                                        id="bank-iban"
                                        type="text"
                                        value={values.bankAccount.IBAN}
                                        name="fullname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="iban"
                                        fullWidth
                                        //error={Boolean(touched.bankAccount.IBAN && errors.bankAccount.IBAN)}
                                    />
                                    {touched.firsbankAccount && errors.bankAccount.IBAN && (
                                        <FormHelperText error id="helper-text-IBAN">
                                            {errors.bankAccount.IBAN}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Submit
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

PsychologistForm.propTypes = {
    hideForm: PropTypes.func
};

export default PsychologistForm;
