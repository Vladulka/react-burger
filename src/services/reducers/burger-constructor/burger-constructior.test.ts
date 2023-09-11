import { burgerConstructorReducer, initialData } from "./burger-constructior";
import { AllInitialTypes, IIngredient } from "../../../types";
import {
	ADD_BUN,
	ADD_INGREDIENT,
	DEL_INGREDIENT,
	DROP_CONSTRUCTOR,
	SORT_INGREDIENTS
} from "../../actions/burger-constructor";
import { currentBunData, currentIngredientData } from "../../../utils/constants";

describe("Check burger constructor", () => {
	it("should return initialState", () => {
		expect(burgerConstructorReducer(undefined, {} as AllInitialTypes)).toEqual(initialData);
	});
	it("ADD_BUN", () => {
		const state = burgerConstructorReducer(initialData, {
			type: ADD_BUN,
			bun: currentBunData
		});
		expect(state.bun).toBe(currentBunData);
	});
	it("ADD_INGREDIENT", () => {
		const state = burgerConstructorReducer(initialData, {
			type: ADD_INGREDIENT,
			item: currentIngredientData
		});
		expect(state.items.find(item => item._id === currentIngredientData._id)).not.toBe(undefined);
	});
	it("DEL_INGREDIENT", () => {
		const state = burgerConstructorReducer(initialData, {
			type: DEL_INGREDIENT,
			id: '1'
		});
		expect(state.items.find(item => item._id === '1')).toBe(undefined);
	});
	it("SORT_INGREDIENTS", () => {
		const state = burgerConstructorReducer(initialData, {
			type: SORT_INGREDIENTS,
			dragIndex: 1,
			hoverIndex: 1
		});
		expect(state.bun).not.toBe({});
		expect(state.items).not.toHaveLength(0);
	});
	it("DROP_CONSTRUCTOR", () => {
		const state = burgerConstructorReducer(initialData, {
			type: DROP_CONSTRUCTOR,
		});
		expect(state.bun).toStrictEqual({} as IIngredient);
		expect(state.items).toStrictEqual([]);
	});
});