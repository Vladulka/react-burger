import React, { FC, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import { Route, Routes } from 'react-router-dom';
import LoginPage from "../../pages/login";
import MainPage from "../../pages/main";
import ProfilePage from "../../pages/profile/profile";
import RegisterPage from "../../pages/register";
import Page404 from "../../pages/page-404";
import { ProtectedRouteElement } from "../protected-route-element/protected-route-element";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import OrdersPage from "../../pages/profile/orders/orders";
import { useLocation, useNavigate } from "react-router";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details";
import ModalBlock from "../modal-block/modal-block";
import { DEL_INGREDIENT_DETAIL } from "../../services/actions/ingredient-details";
import { getAllIngredients } from "../../services/actions/all-ingredients";
import FeedPage from "../../pages/feed/feed";
import OrderDetails from "../profile/order-details/order-details";
import OrderDetailsPage from "../../pages/order-details/order-detail";
import { useAppDispatch } from "../../utils/hooks";

export const App: FC = () => {

	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const background = location.state && location.state.background;

	useEffect(
		() => {
			dispatch(getAllIngredients());
		},
		[ dispatch ]
	);

	const onModalClose = () => {
		dispatch({ type: DEL_INGREDIENT_DETAIL });
		navigate(-1);
	}

	return (
		<div>
			<AppHeader/>
			<main className={ styles.main }>
				<Routes location={ background || location }>
					<Route path="*" element={ <Page404/> }/>
					<Route path="/" element={ <MainPage/> }/>
					<Route path="/feed" element={ <FeedPage/> }/>
					<Route path="/feed/:id" element={ <OrderDetailsPage/> }/>
					<Route path="/ingredients/:ingredientID" element={ <IngredientDetails/> }/>
					<Route path="/login" element={ <ProtectedRouteElement element={ <LoginPage/> } protectedPage/> }/>
					<Route path="/register"
						   element={ <ProtectedRouteElement element={ <RegisterPage/> } protectedPage/> }/>
					<Route path="/forgot-password"
						   element={ <ProtectedRouteElement element={ <ForgotPasswordPage/> } protectedPage/> }/>
					<Route path="/reset-password"
						   element={ <ProtectedRouteElement element={ <ResetPasswordPage/> } protectedPage/> }/>
					<Route path="/profile"
						   element={ <ProtectedRouteElement element={ <ProfilePage/> } protectedPage={ false }/> }>
						<Route path="/profile/orders"
							   element={ <ProtectedRouteElement element={ <OrdersPage/> } protectedPage={ false }/> }/>
					</Route>
				</Routes>
			</main>
			{ background && (
				<Routes>
					<Route
						path="/ingredients/:ingredientID"
						element={
							<ModalBlock onModalClose={ onModalClose }>
								<IngredientDetails/>
							</ModalBlock>
						}
					/>
					<Route
						path={ "/feed/:id" }
						element={
							<ModalBlock onModalClose={ onModalClose }>
								<OrderDetails/>
							</ModalBlock>
						}
					/>
					<Route
						path={ "/profile/orders/:id" }
						element={
							<ModalBlock onModalClose={ onModalClose }>
								<OrderDetails/>
							</ModalBlock>
						}
					/>
				</Routes>
			) }
		</div>
	);
}