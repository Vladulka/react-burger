import {
    DEL_INGREDIENT_DETAIL,
    GET_INGREDIENT_DETAIL,
    InitialIngredientDetailActionTypes
} from "../actions/ingredient-details";
import { IIngredient } from "../../types";

const initialData = {
    currentIngredient: {}
}

type InitialIngredientDetailType = {
    currentIngredient: IIngredient | {}
};

export const ingredientDetailsReducer = (state = initialData, action: InitialIngredientDetailActionTypes): InitialIngredientDetailType => {
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