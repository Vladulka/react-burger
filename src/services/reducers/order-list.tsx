import { OrderHistoryDetailsType } from "../../types";
import { WS_CLOSE, WS_ERROR, WS_MESSAGE, WS_OPEN, WsActionTypes } from "../actions/web-socket";

const orderHistoryDetails: OrderHistoryDetailsType = {
	connect: false,
	error: false,
	orderDetails: {
		success: false,
		orders: [
			{
				ingredients: [],
				_id: '',
				status: '',
				name: '',
				number: null,
				createdAt: '',
				updatedAt: '',
			}
		],
		total: null,
		totalToday: null,
	}
};

export const orderHistoryReducer = (state = orderHistoryDetails, action: WsActionTypes): OrderHistoryDetailsType => {
	switch (action.type) {
		case WS_OPEN: {
			return {
				...state,
				connect: true,
			}
		}
		case WS_CLOSE: {
			return {
				...state,
				connect: false,
				error: false,
				orderDetails: {
					success: false,
					orders: [],
					total: null,
					totalToday: null,
				}
			}
		}
		case WS_ERROR: {
			return {
				...state,
				connect: false,
				error: true,
				orderDetails: {
					success: false,
					orders: [],
					total: null,
					totalToday: null,
				}
			}
		}
		case WS_MESSAGE: {
			return {
				...state,
				orderDetails: {
					success: action.payload.success,
					orders: action.payload.orders,
					total: action.payload.total,
					totalToday: action.payload.totalToday,
				}
			}
		}
		default: {
			return state;
		}
	}
}