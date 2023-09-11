import { IIngredient } from "../../types";

export const GET_INGREDIENT_DETAIL: 'GET_INGREDIENT_DETAIL' = 'GET_INGREDIENT_DETAIL';
export const DEL_INGREDIENT_DETAIL: 'DEL_INGREDIENT_DETAIL' = 'DEL_INGREDIENT_DETAIL';

interface IGetIngredientDetail {
	readonly type: typeof GET_INGREDIENT_DETAIL;
	currentIngredient: IIngredient
}

interface IDelIngredientDetail {
	readonly type: typeof DEL_INGREDIENT_DETAIL;
}

export type InitialIngredientDetailActionTypes = IGetIngredientDetail
	| IDelIngredientDetail;