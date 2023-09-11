import { OrderType } from "../../types";

export const GET_ORDER_INFO_DETAIL: 'GET_ORDER_INFO_DETAIL' = 'GET_ORDER_INFO_DETAIL';
export const DEL_ORDER_INFO_DETAIL: 'DEL_INGREDIENT_DETAIL' = 'DEL_INGREDIENT_DETAIL';

interface IGetOrderInfo {
	readonly type: typeof GET_ORDER_INFO_DETAIL;
	currentOrder: OrderType
}

interface IDelOrderInfo {
	readonly type: typeof DEL_ORDER_INFO_DETAIL;
}

export type InitialOrderInfoActionTypes = IGetOrderInfo
	| IDelOrderInfo;