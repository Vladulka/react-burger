import { AllInitialTypes, OrderType } from "../../types";
import { DEL_ORDER_INFO_DETAIL, GET_ORDER_INFO_DETAIL } from "../actions/order-info";

const initialData = {
    currentOrder: {} as OrderType
}

type InitialOrderInfoType = {
    currentOrder: OrderType
};

export const orderInfoReducer = (state = initialData, action: AllInitialTypes): InitialOrderInfoType => {
    switch (action.type) {
        case GET_ORDER_INFO_DETAIL: {
            return {
                ...state,
                currentOrder: action.currentOrder
            }
        }
        case DEL_ORDER_INFO_DETAIL: {
            return {
                ...state,
                currentOrder: initialData.currentOrder
            }
        }
        default: {
            return state;
        }
    }
}