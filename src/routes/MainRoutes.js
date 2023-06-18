import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import PrivateRoute from 'utils/route-guard/PrivateRoute';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const RegistrationDetail = Loadable(lazy(() => import('pages/registration-detail')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <PrivateRoute>
            <MainLayout />
        </PrivateRoute>
    ),
    children: [
        {
            path: '/',
            element: <DashboardDefault status={'PENDING'} />
        },
        {
            path: 'requests-approved',
            element: <DashboardDefault status={'APPROVED'} />
        },
        {
            path: 'requests-rejected',
            element: <DashboardDefault status={'REJECTED'} />
        },
        {
            path: 'request/:requestId',
            element: <RegistrationDetail />
        }
    ]
};

export default MainRoutes;
