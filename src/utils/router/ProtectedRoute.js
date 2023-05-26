import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, redirectPath = '/signin', children }) => {
	if (!isLoggedIn) {
		return <Navigate to={redirectPath} replace />;
	}
	return children;
};

export default ProtectedRoute;
