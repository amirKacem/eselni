import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, IconButton, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { CheckCircle, Close, Visibility } from '@mui/icons-material';

// project import
import Dot from 'components/@extended/Dot';

// ==============================|| Registration Request TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'id',
        align: 'left',
        disablePadding: false,
        label: 'Id No.'
    },
    {
        id: 'email',
        align: 'left',
        disablePadding: true,
        label: 'Email'
    },
    {
        id: 'fullName',
        align: 'left',
        disablePadding: false,
        label: 'FullName'
    },
    {
        id: 'carbs',
        align: 'left',
        disablePadding: false,

        label: 'Status'
    },
    {
        id: 'certificates',
        align: 'left',
        disablePadding: false,
        label: 'Total Certificates'
    },
    {
        id: 'actions',
        align: 'left',
        disablePadding: false,
        label: 'Actions'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

OrderTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};

// handle StatusChange
const handleStatusChange = (rowId) => {
    setData((prevData) =>
        prevData.map((item) => {
            if (item.id === rowId) {
                return { ...item, status: item.status === 'Active' ? 'Inactive' : 'Active' };
            }
            return item;
        })
    );
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const RegistrationRequestStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 'PENDING':
            color = 'warning';
            title = 'Pending';
            break;
        case 'APPROVED':
            color = 'success';
            title = 'Approved';
            break;
        case 'REJECTED':
            color = 'error';
            title = 'Rejected';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

RegistrationRequestStatus.propTypes = {
    status: PropTypes.string
};

// ==============================|| ORDER TABLE ||============================== //

export default function RegistrationRequestTable({ rows }) {
    const [order] = useState('asc');
    const [orderBy] = useState('id');

    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        '& .MuiTableCell-root:first-child': {
                            pl: 2
                        },
                        '& .MuiTableCell-root:last-child': {
                            pr: 3
                        }
                    }}
                >
                    <OrderTableHead order={order} orderBy={orderBy} />
                    <TableBody>
                        {rows.map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    tabIndex={-1}
                                    key={row.id}
                                >
                                    <TableCell component="th" id={labelId} scope="row" align="left">
                                        <Link color="secondary" component={RouterLink} to="">
                                            {row.id}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="left">{row.fullName}</TableCell>

                                    <TableCell align="left">
                                        <RegistrationRequestStatus status={row.status} />
                                    </TableCell>
                                    <TableCell align="left">{row.certificates.length}</TableCell>
                                    <TableCell>
                                        {row.status === 'PENDING' && (
                                            <>
                                                <IconButton color="primary" onClick={() => handleStatusChange(row.id)}>
                                                    <CheckCircle sx={{ color: 'green' }} />
                                                </IconButton>
                                                <IconButton color="primary" onClick={() => handleStatusChange(row.id)}>
                                                    <Close sx={{ color: 'red' }} />
                                                </IconButton>
                                            </>
                                        )}
                                        <IconButton>
                                            <Visibility color="primary" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

RegistrationRequestTable.propTypes = {
    rows: PropTypes.array
};
