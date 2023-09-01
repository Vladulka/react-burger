import { Navigate } from 'react-router-dom';
import { useLocation } from "react-router";
import { ReactElement } from "react";
import { useAppSelector } from "../../utils/hooks";

interface IProtectedRoute {
	element: ReactElement,
	protectedPage?: boolean
}

export const ProtectedRouteElement = ({ element, protectedPage = false }: IProtectedRoute) => {
	const location = useLocation();

	const { isAuthChecked } = useAppSelector(store => store.userData);
	const { name, email } = useAppSelector(store => store.userData.user);

	if(!isAuthChecked) {
		return null;
	}

	if(!protectedPage && name === "" && email === "") {
		return <Navigate to='/login' state={{from: location}} />
	}

	if(protectedPage && name !== "" && email !== "") {
		const { from } = location.state || { from: { pathname: '/' } }
		return <Navigate to={from} />
	}

	return element;
}

export const RouteToAuthUser = ProtectedRouteElement;
export const RouteToNotAuthUser = ({ element }: IProtectedRoute) => {
	return <ProtectedRouteElement protectedPage={true} element={element} />
}