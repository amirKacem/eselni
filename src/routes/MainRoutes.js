import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import PrivateRoute from 'utils/route-guard/PrivateRoute';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

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
        }
    ]
};

export default MainRoutes;
