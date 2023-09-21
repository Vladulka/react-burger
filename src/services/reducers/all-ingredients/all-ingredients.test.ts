import {
	GET_ALL_INGREDIENTS_FAILED,
	GET_ALL_INGREDIENTS_REQUEST,
	GET_ALL_INGREDIENTS_SUCCESS
} from "../../actions/all-ingredients";
import { allIngredientsReducer, initialData } from "./all-ingredients";
import { AllInitialTypes } from "../../../types";
import { ingredientArrayData } from "../../../utils/constants";

describe("Check all ingredients", () => {
	it("should return initialState", () => {
		expect(allIngredientsReducer(undefined, {} as AllInitialTypes)).toEqual(initialData);
	});
	it("GET_ALL_INGREDIENTS_REQUEST", () => {
		const state = allIngredientsReducer(initialData, {
			type: GET_ALL_INGREDIENTS_REQUEST,
		});
		expect(state.ingredientsRequest).toBe(true);
	});
	it("GET_ALL_INGREDIENTS_SUCCESS", () => {
		const state = allIngredientsReducer(initialData, {
			type: GET_ALL_INGREDIENTS_SUCCESS,
			data: ingredientArrayData
		});
		expect(state.ingredientsRequest).toBe(false);
		expect(state.ingredientsFailed).toBe(false);
	});
	it("GET_ALL_INGREDIENTS_FAILED", () => {
		const state = allIngredientsReducer(initialData, {
			type: GET_ALL_INGREDIENTS_FAILED,
		});
		expect(state.ingredientsRequest).toBe(false);
		expect(state.ingredientsFailed).toBe(true);
	});
});