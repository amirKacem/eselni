// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-requests',
    title: 'Sign Up Requests',
    type: 'group',
    children: [
        {
            id: 'pending-requests',
            title: 'Pending Requests',
            type: 'item',
            url: '/',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'approved-requests',
            title: 'Approved Requests',
            type: 'item',
            url: '/requests-approved',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'rejected-requests',
            title: 'Rejected Requests',
            type: 'item',
            url: '/requests-rejected',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
