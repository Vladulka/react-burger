import {Navigate, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {getCookie} from "../../utils/cookie";
import {useSelector} from "react-redux";
import {useLocation} from "react-router";

export function ProtectedRouteElement({ element, protectedPage }) {
    const location = useLocation();

    const token = getCookie('accessToken') || localStorage.getItem('refreshToken')
    const { from } = location.state || { from: { pathname: '/' } };

    if (protectedPage && token) {
        return <Navigate to={from} />;
    }

    if (!protectedPage && !token) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return element;
}