import { ReactElement } from "react";
import { WsActionTypes } from "../services/actions/web-socket";
import { InitialAllIngredientsActionTypes } from "../services/actions/all-ingredients";
import { InitialAuthActionTypes } from "../services/actions/authorization";
import { InitialIngredientDetailActionTypes } from "../services/actions/ingredient-details";
import { InitialRegisterActionTypes } from "../services/actions/registration";
import { InitialUserActionTypes } from "../services/actions/user";
import { InitialBurgerConstructorActionTypes } from "../services/actions/burger-constructor";
import { InitialOrderActionTypes } from "../services/actions/order-details";
import { InitialOrderInfoActionTypes } from "../services/actions/order-info";

export interface IIngredient {
	calories: number,
	carbohydrates: number,
	fat: number,
	image: string,
	image_large: string,
	image_mobile: string,
	name: string,
	price: number,
	proteins: number,
	type: string,
	itemID?: string,
	_id?: string,
	isLocked?: boolean,
	elementType?: undefined | 'top' | 'bottom',
	index?: number
}

export interface IDropItem {
	index: number | undefined;
	type: string;
	id: string;
}

export interface IDragItem {
	data: IIngredient;
}

export type TAuthUser = {
	name?: string;
	email: string;
	password: string;
}

export type TResetPassword = {
	password: string;
	code: string;
}

export interface IModal {
	children: ReactElement,
	onModalClose: () => void
}

export type TServerResponse<T> = {
	success: boolean;
} & T;

export type TRefreshResponse = TServerResponse<{
	refreshToken: string;
	accessToken: string;
}>;

export type TIngredientsResponse = TServerResponse<{
	data: IIngredient[];
}>;

export interface IAuthToken {
	accessToken: string
	refreshToken: string
}

export interface IOrderDetails {
	length: number;
	createdAt: string;
	ingredients: Array<string>;
	name: string;
	number: number;
	status: string;
	updatedAt: string;
	_id: string;
}

export interface IUser {
	name: string,
	email: string,
	password: string
}

export interface IUserResponse {
	email: string,
	name: string
}

export type OrderType = {
	ingredients: Array<string>,
	_id: string,
	status: string,
	name: string,
	number: number | null | string,
	createdAt: string,
	updatedAt: string,
};

export type OrderHistoryType = {
	success: boolean,
	orders: Array<OrderType>,
	total: number | null,
	totalToday: number | null,
	message?: string
}

export type OrderHistoryDetailsType = {
	connect: boolean,
	error: boolean,
	orderDetails: OrderHistoryType,
};

export type TResetPasswordResponse = { message: string };
export type TChangePasswordResponse = TServerResponse<{ data: { message: string } }>
export type TOrderDetailsResponse = TServerResponse<IOrderDetails>
export type TAuthResponse = TServerResponse<IUser & IAuthToken>
export type TLogoutResponse = TServerResponse<IAuthToken & { message: string }>
export type TAuthDataResponse = TServerResponse<{ user: IUserResponse } & IAuthToken>

export type AllInitialTypes =
	| WsActionTypes
	| InitialAllIngredientsActionTypes
	| InitialAuthActionTypes
	| InitialIngredientDetailActionTypes
	| InitialRegisterActionTypes
	| InitialUserActionTypes
	| InitialBurgerConstructorActionTypes
	| InitialOrderActionTypes
	| InitialOrderInfoActionTypes;
