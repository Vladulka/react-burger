import { orderInfoReducer, initialData } from "./order-info";
import { AllInitialTypes } from "../../../types";
import { DEL_ORDER_INFO_DETAIL, GET_ORDER_INFO_DETAIL } from "../../actions/order-info";
import { orderData } from "../../../utils/constants";

describe("Check order info", () => {
	it("should return initialState", () => {
		expect(orderInfoReducer(undefined, {} as AllInitialTypes)).toEqual(initialData);
	});
	it("GET_ORDER_INFO_DETAIL", () => {
		const state = orderInfoReducer(initialData, {
			type: GET_ORDER_INFO_DETAIL,
			currentOrder: orderData
		});
		expect(state.currentOrder).toBe(orderData);
	});
	it("DEL_ORDER_INFO_DETAIL", () => {
		const state = orderInfoReducer(initialData, {
			type: DEL_ORDER_INFO_DETAIL,
		});
		expect(state.currentOrder).toStrictEqual({});
	});
});