import {GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from "../../actions/order-details";
import { AllInitialTypes, IOrderDetails } from "../../../types";

export const initialData = {
    order: {} as IOrderDetails,
    orderRequest: false,
    orderFailed: false,
}

type InitialAllIngredientsType = {
    order: IOrderDetails,
    orderRequest: boolean,
    orderFailed: boolean,
};

export const orderDetailsReducer = (state = initialData, action: AllInitialTypes): InitialAllIngredientsType => {
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
                order: initialData.order,
                orderFailed: true,
                orderRequest: false
            };
        }
        default: {
            return state;
        }
    }
}