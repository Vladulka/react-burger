import { ingredientDetailsReducer, initialData } from "./ingredient-details";
import { AllInitialTypes } from "../../../types";
import { DEL_INGREDIENT_DETAIL, GET_INGREDIENT_DETAIL } from "../../actions/ingredient-details";
import { currentIngredientData } from "../../../utils/constants";

describe("Check ingredient details", () => {
    it("should return initialState", () => {
        expect(ingredientDetailsReducer(undefined, {} as AllInitialTypes)).toEqual(initialData);
    });
    it("GET_INGREDIENT_DETAIL", () => {
        const state = ingredientDetailsReducer(initialData, {
            type: GET_INGREDIENT_DETAIL,
            currentIngredient: currentIngredientData
        });
        expect(state.currentIngredient).toBe(currentIngredientData)
    });
    it("DEL_INGREDIENT_DETAIL", () => {
        const state = ingredientDetailsReducer(initialData, {
            type: DEL_INGREDIENT_DETAIL,
        });
        expect(state.currentIngredient).toStrictEqual({});
    });
});