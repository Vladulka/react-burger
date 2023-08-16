import {
    GET_ALL_INGREDIENTS_FAILED,
    GET_ALL_INGREDIENTS_REQUEST,
    GET_ALL_INGREDIENTS_SUCCESS
} from "../actions/all-ingredients";

const initialData = {
    allIngredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false
}

export const allIngredientsReducer = (state = initialData, action) => {
    switch (action.type) {
        case GET_ALL_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            };
        }
        case GET_ALL_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsFailed: false,
                allIngredients: action.data,
                ingredientsRequest: false
            };
        }
        case GET_ALL_INGREDIENTS_FAILED: {
            return {
                allIngredients: [],
                ingredientsFailed: true,
                ingredientsRequest: false
            };
        }
        default: {
            return state;
        }
    }
}