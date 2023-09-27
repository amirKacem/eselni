import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// redux
import { createPsychologistRequest } from 'store/thunks/psychologistThunk';
import { findRegistrationRequest } from 'store/thunks/registerRequestThunk';
import { signUpRequestSelector } from 'store/slices/signUpRequestSlice';
import { useSelector, useDispatch } from 'react-redux';

import { useState } from 'react';
import { FormControl, MenuItem, Select, Checkbox, ListItemText, Box, Chip } from '@mui/material';

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

    const handleClick = async (values) => {
        console.log('true');
        await dispatch(
            createPsychologistRequest({
                account: {
                    email: registrationRequest.email,
                    password: values.password,
                    fullName: registrationRequest.fullName
                },
                city: values.city,
                fullAddress: values.fullAddress,
                image: values.image,
                phoneNumber: registrationRequest.phoneNumber,
                presentation: registrationRequest.presentation,
                hourlyRate: values.hourlyRate,
                messageRate: 0,
                certificates: registrationRequest.certificates,
                domains: values.domains,
                bankAccount: {
                    IBAN: values.bankAccount_IBAN,
                    bank: values.bankAccount_bank,
                    fullName: values.bankAccount_fullName
                }
            })
        );
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
        console.log('test');
    }

    const domains = [
        { value: 'CLINICAL_PSYCHOLOGY ', label: 'Clinical psychology' },
        { value: 'WORK_PSYCHOLOGY', label: 'Work psychology' },
        { value: 'RELAXATION_PSYCHOLOGY', label: 'Relaxation psychology' },
        { value: 'ADDICTION_STUDIES', label: 'Addiction studies' },
        { value: 'CHILD_PSYCHOLOGY', label: 'Child psychology' },
        { value: 'ADOLESCENT_PSYCHOLOGY', label: 'Adolescent psychology' },
        { value: 'NEUROPSYCHOLOGY', label: 'Neuropsychology' }
        // Add more options as needed
    ];

    return (
        <>
            <Formik
                initialValues={{
                    email: registrationRequest.email,
                    password: '',
                    hourlyRate: 0,
                    city: '',
                    fullAddress: '',
                    image: '',
                    domains: [],
                    bankAccount_fullName: '',
                    bankAccount_IBAN: '',
                    bankAccount_bank: ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                    city: Yup.string().max(255).required('City is required'),
                    fullAddress: Yup.string().max(255).required('Full Address is required'),
                    image: Yup.string().required('Image is required'),
                    domains: Yup.array().min(1, 'At least one domain must be selected'),
                    bankAccount_fullName: Yup.string().max(255).required('Full Name is required'),
                    bankAccount_IBAN: Yup.string().max(255).required('IBAN is required'),
                    bankAccount_bank: Yup.string().max(255).required('BANK is required')
                })}
                onSubmit={async (values) => {
                    console.log('true');
                    await dispatch(
                        createPsychologistRequest({
                            account: {
                                email: registrationRequest.email,
                                password: values.password,
                                fullName: registrationRequest.fullName
                            },
                            city: values.city,
                            fullAddress: values.fullAddress,
                            image: values.image,
                            phoneNumber: registrationRequest.phoneNumber,
                            presentation: registrationRequest.presentation,
                            hourlyRate: values.hourlyRate,
                            messageRate: 0,
                            certificates: registrationRequest.certificates,
                            domains: values.domains,
                            bankAccount: {
                                IBAN: values.bankAccount_IBAN,
                                bank: values.bankAccount_bank,
                                fullName: values.bankAccount_fullName
                            }
                        })
                    );
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue, isValid }) => (
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
                                    <InputLabel htmlFor="password-login">Password*</InputLabel>
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
                                    <InputLabel htmlFor="firstname-signup">Full Address*</InputLabel>
                                    <OutlinedInput
                                        id="address-psy"
                                        type="text"
                                        value={values.fullAddress}
                                        name="fullAddress"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Address"
                                        fullWidth
                                        error={Boolean(touched.fullAddress && errors.fullAddress)}
                                    />
                                    {touched.fullAddress && errors.fullAddress && (
                                        <FormHelperText error id="helper-text-address">
                                            {errors.fullAddress}
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
                                {errors.image && (
                                    <FormHelperText error id="helper-text-image">
                                        {errors.image}
                                    </FormHelperText>
                                )}
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
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel id="demo-multiple-chip-label">Domains</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        multiple
                                        value={values.domains}
                                        name="domains"
                                        onChange={handleChange}
                                        input={<OutlinedInput id="select-multiple-chip" placeholder="Chip" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} variant="light" color="primary" size="small" />
                                                ))}
                                            </Box>
                                        )}
                                        error={Boolean(errors.domains)}
                                    >
                                        {domains.map((domain) => (
                                            <MenuItem key={domain.value} value={domain.value}>
                                                {domain.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.domains && (
                                        <FormHelperText error id="helper-text-domains">
                                            {errors.domains}
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
                                        type="text"
                                        value={values.bankAccount_fullName}
                                        name="bankAccount_fullName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="John"
                                        fullWidth
                                    />
                                    {touched.bankAccount_fullName && errors.bankAccount_fullName && (
                                        <FormHelperText error id="helper-bankAccount-fullName">
                                            {errors.bankAccount_fullName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstname-signup">Bank*</InputLabel>
                                    <OutlinedInput
                                        type="text"
                                        value={values.bankAccount_bank}
                                        name="bankAccount_bank"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="bank"
                                        fullWidth
                                    />
                                    {touched.bankAccount_bank && errors.bankAccount_bank && (
                                        <FormHelperText error id="helper-bankAccount-bank">
                                            {errors.bankAccount_bank}
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
                                        value={values.bankAccount_IBAN}
                                        name="bankAccount_IBAN"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="IBAN"
                                        fullWidth
                                    />
                                    {touched.bankAccount_IBAN && errors.bankAccount_IBAN && (
                                        <FormHelperText error id="helper-text-IBAN">
                                            {errors.bankAccount_IBAN}
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
                                        onClick={async () => {
                                            handleClick(values);
                                        }}
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
