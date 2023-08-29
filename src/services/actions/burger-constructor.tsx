import { IIngredient } from "../../types";

export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DEL_INGREDIENT: 'DEL_INGREDIENT' = 'DEL_INGREDIENT';
export const SORT_INGREDIENTS: 'SORT_INGREDIENTS' = 'SORT_INGREDIENTS';
export const DROP_CONSTRUCTOR: 'DROP_CONSTRUCTOR' = 'DROP_CONSTRUCTOR';

interface IAddBun {
	readonly type: typeof ADD_BUN;
	bun: IIngredient
}

interface IAddIngredient {
	readonly type: typeof ADD_INGREDIENT;
	item: IIngredient
}

interface IDelIngredient {
	readonly type: typeof DEL_INGREDIENT;
	id: string;
}

interface ISortIngredients {
	readonly type: typeof SORT_INGREDIENTS;
	dragIndex: number;
	hoverIndex: number;
}

interface IDropConstructor {
	readonly type: typeof DROP_CONSTRUCTOR;
}

export type InitialBurgerConstructorActionTypes = IAddBun
	| IAddIngredient
	| IDelIngredient
	| ISortIngredients
	| IDropConstructor;