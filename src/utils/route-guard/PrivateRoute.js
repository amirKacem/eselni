import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { history } from '../history';

import { getLocalStorageItem } from 'utils/helpers/index';

function PrivateRoute({ children }) {
    const user = JSON.parse(getLocalStorageItem('user')) ?? false;

    if (typeof user.administrator === 'undefined' || user.administrator === null) {
        return <Navigate to="/login" state={{ from: history.location }} />;
    }

    return children;
}
PrivateRoute.propTypes = {
    children: PropTypes.node
};

export default PrivateRoute;
