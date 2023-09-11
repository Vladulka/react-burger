import {
	GET_AUTH_FAILED,
	GET_AUTH_REQUEST,
	GET_AUTH_SUCCESS,
} from "../../actions/authorization";
import { authorizationReducer, initialData} from "./authorization";
import { AllInitialTypes } from "../../../types";
import { currentAuthData } from "../../../utils/constants";

describe("Check authorization", () => {
	it("should return initialState", () => {
		expect(authorizationReducer(undefined, {} as AllInitialTypes)).toEqual(initialData);
	});
	it("GET_AUTH_REQUEST", () => {
		const state = authorizationReducer(initialData, {
			type: GET_AUTH_REQUEST,
		});
		expect(state.authRequest).toBe(true);
	});
	it("GET_AUTH_SUCCESS", () => {
		const state = authorizationReducer(initialData, {
			type: GET_AUTH_SUCCESS,
			data: currentAuthData
		});
		expect(state.authRequest).toBe(false);
		expect(state.authFailed).toBe(false);
	});
	it("GET_AUTH_FAILED", () => {
		const state = authorizationReducer(initialData, {
			type: GET_AUTH_FAILED,
		});
		expect(state.authRequest).toBe(false);
		expect(state.authFailed).toBe(true);
	});
});