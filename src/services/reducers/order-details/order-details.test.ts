import { GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "../../actions/order-details";
import { orderDetailsReducer, initialData } from "./order-details";
import { AllInitialTypes } from "../../../types";
import { orderData } from "../../../utils/constants";

describe("Check order details", () => {
	it("should return initialState", () => {
		expect(orderDetailsReducer(undefined, {} as AllInitialTypes)).toEqual(initialData);
	});
	it("GET_ORDER_REQUEST", () => {
		const state = orderDetailsReducer(initialData, {
			type: GET_ORDER_REQUEST,
		});
		expect(state.orderRequest).toBe(true);
	});
	it("GET_ORDER_SUCCESS", () => {
		const state = orderDetailsReducer(initialData, {
			type: GET_ORDER_SUCCESS,
			data: orderData
		});
		expect(state.orderRequest).toBe(false);
		expect(state.orderFailed).toBe(false);
	});
	it("GET_ORDER_FAILED", () => {
		const state = orderDetailsReducer(initialData, {
			type: GET_ORDER_FAILED,
		});
		expect(state.orderRequest).toBe(false);
		expect(state.orderFailed).toBe(true);
	});
});