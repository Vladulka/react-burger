import { Navigate } from 'react-router-dom';
import { getCookie } from "../../utils/cookie";
import { useLocation } from "react-router";
import { ReactElement } from "react";

interface IProtectedRoute {
	element: ReactElement,
	protectedPage: boolean
}

export const ProtectedRouteElement = ({ element, protectedPage }: IProtectedRoute): any => {
	const location = useLocation();

	const token = getCookie('accessToken') || localStorage.getItem('refreshToken')
	const { from } = location.state || { from: { pathname: '/' } };

	if ( protectedPage && token ) {
		return <Navigate to={ from }/>;
	}

	if ( !protectedPage && !token ) {
		return <Navigate to="/login" state={ { from: location } }/>;
	}

	return element;
}