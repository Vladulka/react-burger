import {GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from "../actions/order-details";

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
                order: {},
                orderFailed: true,
                orderRequest: false
            };
        }
        default: {
            return state;
        }
    }
}