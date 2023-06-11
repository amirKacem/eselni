import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// redux
import { signUpRequest } from 'store/thunks/registerRequestThunk';
import { signUpRequestSelector } from 'store/slices/signUpRequestSlice';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import UploadFileIcon from '@mui/icons-material/UploadFile';

// third party
import * as Yup from 'yup';
import { Formik, FieldArray, Field, ErrorMessage } from 'formik';
import { DateField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { toBase64 } from 'utils/helpers/index';

const Input = styled('input')({
    display: 'none'
});

const AuthRegister = ({ hideForm }) => {
    const dispatch = useDispatch();
    const { isSuccess, isError } = useSelector(signUpRequestSelector);
    const [error, setError] = React.useState(false);
    const isValidCertficateField = (errors, index, fieldName) => {
        return errors.certificates && errors.certificates[index] && errors.certificates[index][fieldName];
    };

    const isTouchedCertficateField = (touched, index) => {
        return touched.certificates && touched.certificates[index];
    };

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
                    firstname: '',
                    lastname: '',
                    email: '',
                    date: dayjs(),
                    phoneNumber: '',
                    presentation: '',
                    status: 0,
                    certificates: [
                        {
                            title: '',
                            description: '',
                            image: ''
                        }
                    ],
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    firstname: Yup.string().max(255).required('First Name is required'),
                    lastname: Yup.string().max(255).required('Last Name is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    date: Yup.date().required(),
                    presentation: Yup.string().required(),
                    phoneNumber: Yup.number('Invalid Phone Number')
                        .positive("A phone number can't start with a minus")
                        .integer("A phone number can't include a decimal point")
                        .min(8)
                        .required('A phone number is required'),
                    certificates: Yup.array().of(
                        Yup.object().shape({
                            title: Yup.string().required(),
                            description: Yup.string().required()
                        })
                    )
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    values.fullName = values.firstname + ' ' + values.lastname;
                    await dispatch(signUpRequest(values));
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue, setTouched }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        {error && (
                            <Grid item xs={12}>
                                <Typography paragraph={true} align="center" color="error">
                                    {error}
                                </Typography>
                            </Grid>
                        )}
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                                    <OutlinedInput
                                        id="firstname-login"
                                        type="firstname"
                                        value={values.firstname}
                                        name="firstname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="John"
                                        fullWidth
                                        error={Boolean(touched.firstname && errors.firstname)}
                                    />
                                    {touched.firstname && errors.firstname && (
                                        <FormHelperText error id="helper-text-firstname-signup">
                                            {errors.firstname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.lastname && errors.lastname)}
                                        id="lastname-signup"
                                        type="lastname"
                                        value={values.lastname}
                                        name="lastname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        inputProps={{}}
                                    />
                                    {touched.lastname && errors.lastname && (
                                        <FormHelperText error id="helper-text-lastname-signup">
                                            {errors.lastname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="exemple@company.com"
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="helper-text-email-signup">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="phone-register">Phone Number*</InputLabel>
                                    <OutlinedInput
                                        id="phone-register"
                                        type="tel"
                                        value={values.phoneNumber}
                                        name="phoneNumber"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Phone"
                                        fullWidth
                                        error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                    />
                                    {touched.phoneNumber && errors.phoneNumber && (
                                        <FormHelperText error id="helper-text-phoneNumber-signup">
                                            {errors.phoneNumber}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="date-register">Date *</InputLabel>
                                    <DateField
                                        fullWidth
                                        label=""
                                        id="date-register"
                                        value={values.date}
                                        onChange={(date) => setFieldValue('date', date)}
                                        name="date"
                                        inputProps={{}}
                                        error={Boolean(touched.date && errors.date)}
                                    />
                                    {touched.date && errors.date && (
                                        <FormHelperText error id="helper-text-date-register">
                                            {errors.date}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="presentation-register">Presentation*</InputLabel>
                                    <OutlinedInput
                                        id="presentation-register"
                                        value={values.presentation}
                                        name="presentation"
                                        onBlur={handleBlur}
                                        minRows={4}
                                        onChange={handleChange}
                                        multiline={true}
                                        error={Boolean(touched.presentation && errors.presentation)}
                                    />
                                    {touched.presentation && errors.presentation && (
                                        <FormHelperText error id="helper-text-presentation-signup">
                                            {errors.presentation}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <FieldArray name="certificates">
                                {({ insert, remove, push }) => (
                                    <Grid item md={12}>
                                        {values.certificates.length > 0 &&
                                            values.certificates.map((certficate, index) => (
                                                <div key={index}>
                                                    <Grid container spacing={2} rowSpacing={1}>
                                                        <Grid item md={6}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor={`certificates.${index}.title`}>Title*</InputLabel>
                                                                <OutlinedInput
                                                                    id={`certificates.${index}.title-register`}
                                                                    type="text"
                                                                    name={`certificates[${index}].title`}
                                                                    placeholder="Title"
                                                                    onChange={(e) =>
                                                                        setFieldValue(`certificates[${index}].title`, e.target.value)
                                                                    }
                                                                    onBlur={handleBlur}
                                                                    error={Boolean(
                                                                        isTouchedCertficateField(touched, index) &&
                                                                            isValidCertficateField(errors, index, 'title')
                                                                    )}
                                                                />
                                                                {isTouchedCertficateField(touched, index, 'title') &&
                                                                    isValidCertficateField(errors, index, 'title') && (
                                                                        <FormHelperText error id="helper-text-presentation-signup">
                                                                            {errors.certificates[index].title}
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
                                                                    Upload Cerficate
                                                                    <Input
                                                                        name={`certificates.${index}.image`}
                                                                        accept="image/*"
                                                                        id="contained-button-file"
                                                                        type="file"
                                                                        onChange={(e) => {
                                                                            toBase64(e.target.files[0]).then((data) => {
                                                                                var base64String = btoa(data);
                                                                                setFieldValue(`certificates[${index}].image`, base64String);
                                                                            });
                                                                        }}
                                                                    />
                                                                </Button>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item md={12}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor={`certificates.${index}.description`}>
                                                                    Description*
                                                                </InputLabel>{' '}
                                                                <OutlinedInput
                                                                    id={`certificates.${index}.description-register`}
                                                                    name={`certificates[${index}].description`}
                                                                    placeholder="Description"
                                                                    minRows={3}
                                                                    multiline={true}
                                                                    onChange={(e) =>
                                                                        setFieldValue(`certificates[${index}].description`, e.target.value)
                                                                    }
                                                                    onBlur={handleBlur}
                                                                    error={Boolean(
                                                                        isTouchedCertficateField(touched, index) &&
                                                                            isValidCertficateField(errors, index, 'description')
                                                                    )}
                                                                />
                                                                {isTouchedCertficateField(touched, index) &&
                                                                    isValidCertficateField(errors, index, 'description') && (
                                                                        <FormHelperText error id="helper-text-presentation-signup">
                                                                            {errors.certificates[index].description}
                                                                        </FormHelperText>
                                                                    )}
                                                            </Stack>
                                                        </Grid>

                                                        <Grid item md={12}>
                                                            <Stack direction="row" justifyContent="center" alignItems="center">
                                                                {index != 0 && (
                                                                    <IconButton
                                                                        aria-label="delete"
                                                                        size="small"
                                                                        type="button"
                                                                        variant="contained"
                                                                        color="error"
                                                                        onClick={() => remove(index)}
                                                                    >
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                )}
                                                            </Stack>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            ))}

                                        <Grid item md={12}>
                                            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                                                <IconButton
                                                    size="large"
                                                    type="button"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => push({ title: '', description: '', image: '' })}
                                                >
                                                    <AddBoxIcon fontSize="large" />
                                                </IconButton>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                )}
                            </FieldArray>
                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    By Signing up, you agree to our &nbsp;
                                    <Link variant="subtitle2" component={RouterLink} to="#">
                                        Terms of Service
                                    </Link>
                                    &nbsp; and &nbsp;
                                    <Link variant="subtitle2" component={RouterLink} to="#">
                                        Privacy Policy
                                    </Link>
                                </Typography>
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
                                        Create Account
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

export default AuthRegister;
