import { ReactElement } from "react";

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

export type TResetPasswordResponse = { message: string }
export type TChangePasswordResponse = TServerResponse<{ data: { message: string } }>
export type TOrderDetailsResponse = TServerResponse<IOrderDetails>
export type TAuthResponse = TServerResponse<{ user: IUser } & IAuthToken>
export type TLogoutResponse = TServerResponse<IAuthToken & { message: string }>
