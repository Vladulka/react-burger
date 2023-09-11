import {
    DEL_INGREDIENT_DETAIL,
    GET_INGREDIENT_DETAIL
} from "../../actions/ingredient-details";
import { AllInitialTypes, IIngredient } from "../../../types";

export const initialData = {
    currentIngredient: {}
}

type InitialIngredientDetailType = {
    currentIngredient: IIngredient | {}
};

export const ingredientDetailsReducer = (state = initialData, action: AllInitialTypes): InitialIngredientDetailType => {
    switch (action.type) {
        case GET_INGREDIENT_DETAIL: {
            return {
                ...state,
                currentIngredient: action.currentIngredient
            }
        }
        case DEL_INGREDIENT_DETAIL: {
            return {
                ...state,
                currentIngredient: {}
            }
        }
        default: {
            return state;
        }
    }
}