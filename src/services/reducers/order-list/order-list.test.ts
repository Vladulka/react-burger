import { WS_CLOSE, WS_ERROR, WS_MESSAGE, WS_OPEN } from "../../actions/web-socket";
import { orderHistoryReducer, orderHistoryDetails } from "./order-list";
import { AllInitialTypes } from "../../../types";
import { ordersData } from "../../../utils/constants";

describe("Check order history", () => {
	it("should return initialState", () => {
		expect(orderHistoryReducer(undefined, {} as AllInitialTypes)).toEqual(orderHistoryDetails);
	});
	it("WS_OPEN", () => {
		const state = orderHistoryReducer(orderHistoryDetails, {
			type: WS_OPEN,
		});
		expect(state.connect).toBe(true);
	});
	it("WS_CLOSE", () => {
		const state = orderHistoryReducer(orderHistoryDetails, {
			type: WS_CLOSE,
		});
		expect(state.connect).toBe(false);
		expect(state.error).toBe(false);
		expect(state.orderDetails.success).toBe(false);
	});
	it("WS_ERROR", () => {
		const state = orderHistoryReducer(orderHistoryDetails, {
			type: WS_ERROR,
		});
		expect(state.connect).toBe(false);
		expect(state.error).toBe(true);
		expect(state.orderDetails.success).toBe(false);
	});
	it("WS_MESSAGE", () => {
		const state = orderHistoryReducer(orderHistoryDetails, {
			type: WS_MESSAGE,
			payload: ordersData
		});
		expect(state.connect).toBe(false);
		expect(state.error).toBe(false);
		expect(state.orderDetails.success).toBe(true);
	});
});