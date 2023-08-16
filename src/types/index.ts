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

export interface IIngredientCard {
	onModalClick: (data: IIngredient) => void,
	data: IIngredient
}

export interface IIngredientBlock {
	type: string,
	onModalClick: (data: IIngredient) => void,
	lookRef: (node?: Element | null | undefined) => void
}

export type TEventTarget = {
	target: {
		value: string;
		name: string;
	};
};

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