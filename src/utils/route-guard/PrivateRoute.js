import { Navigate } from 'react-router-dom';

import { history } from '../history';

import { getLocalStorageItem } from 'utils/helpers/index';

function PrivateRoute({ children }) {
    const user = JSON.parse(getLocalStorageItem('user')) ?? false;

    if (typeof user.administrator === 'undefined' || user.administrator === null) {
        console.log('redirect');
        return <Navigate to="/login" state={{ from: history.location }} />;
    }

    return children;
}

export default PrivateRoute;
