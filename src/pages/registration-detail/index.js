import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateRegistrationRequest, findRegistrationRequest } from 'store/thunks/registerRequestThunk';
import { updateRequestStatus } from 'store/slices/registrationRequestSlice';

// material-ui
import {
    Grid,
    Typography,
    Link,
    CardContent,
    Divider,
    List,
    ToggleButtonGroup,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Card,
    CardMedia
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import EventIcon from '@mui/icons-material/Event';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
// project import
import MainCard from 'components/MainCard';
import { presetPalettes } from '@ant-design/colors';
import { base64ToUtf8 } from 'utils/helpers/index';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const RegistrationDetail = () => {
    let { requestId } = useParams();
    const registrationRequest = useSelector((state) => state.registrationRequest.request);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findRegistrationRequest(requestId));
    }, []);

    if (registrationRequest.id == null) {
        return 'Not Found';
    }
    const updateStatus = (status) => {
        dispatch(updateRegistrationRequest({ requestId, status })).then(() => {
            dispatch(updateRequestStatus(status));
        });
    };

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Regisrtation Request Detail</Typography>
            </Grid>
            <Grid item xs={4}>
                {registrationRequest.status === 'PENDING' && (
                    <MainCard title="Response">
                        <Grid container justifyContent="center">
                            <Grid item>
                                <ListItem style={{ display: 'flex', alignItems: 'center' }}>
                                    <ListItemAvatar>
                                        <Avatar
                                            style={{ cursor: 'pointer' }}
                                            sx={{ bgcolor: presetPalettes.green[7] }}
                                            onClick={() => updateStatus('APPROVED')}
                                        >
                                            <CheckIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemAvatar>
                                        <Avatar
                                            style={{ cursor: 'pointer' }}
                                            sx={{ bgcolor: presetPalettes.red[7] }}
                                            onClick={() => updateStatus('REJECTED')}
                                        >
                                            <CloseIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                </ListItem>
                            </Grid>
                        </Grid>
                    </MainCard>
                )}
                <Divider />
                <MainCard title="Personal Informations">
                    <List
                        sx={{
                            width: '100%',
                            maxWidth: 360,
                            bgcolor: 'background.paper'
                        }}
                    >
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="FullName" secondary={registrationRequest.fullName} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <MailIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Email" secondary={registrationRequest.email} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <LocalPhoneIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Phone Number" secondary={registrationRequest.phoneNumber} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <EventIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Date" secondary={registrationRequest.date} />
                        </ListItem>
                    </List>
                </MainCard>
            </Grid>

            {/* row 3 */}
            <Grid item xs={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item />
                </Grid>
                <MainCard title="Presentation">
                    <Typography variant="body1">{registrationRequest.presentation}</Typography>
                </MainCard>
                <MainCard title="Certificates" secondary={<Link color="primary" href="/"></Link>}>
                    {registrationRequest.certificates &&
                        registrationRequest.certificates.map((certificate) => (
                            <Card key={certificate.id}>
                                <CardMedia component="img" src={base64ToUtf8(certificate.image)} alt="green iguana" />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {certificate.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {certificate.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default RegistrationDetail;
