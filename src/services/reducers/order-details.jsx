import {
    GET_ALL_INGREDIENTS_FAILED,
    GET_ALL_INGREDIENTS_REQUEST,
    GET_ALL_INGREDIENTS_SUCCESS, GET_ORDER_FAILED,
    GET_ORDER_REQUEST, GET_ORDER_SUCCESS
} from "../actions";

const initialData = {
    order: {},
    orderRequest: false,
    orderFailed: false,
}

export const orderDetailsReducer = (state = initialData, action) => {
    switch (action.type) {
        case  GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderFailed: false,
                order: action.data,
                orderRequest: false
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            };
        }
        default: {
            return state;
        }
    }
}