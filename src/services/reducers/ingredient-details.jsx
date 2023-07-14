import {DEL_INGREDIENT_DETAIL, GET_INGREDIENT_DETAIL} from "../actions/ingredient-details";

const initialData = {
    currentIngredient: {}
}

export const ingredientDetailsReducer = (state = initialData, action) => {
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