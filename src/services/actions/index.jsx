import {getIngredientsData, getOrderDetailsData} from "../../utils/api";

export const GET_ALL_INGREDIENTS_REQUEST = 'GET_ALL_INGREDIENTS_REQUEST';
export const GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS';
export const GET_ALL_INGREDIENTS_FAILED = 'GET_ALL_INGREDIENTS_FAILED';

export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DEL_INGREDIENT = 'DEL_INGREDIENT';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';

export const GET_INGREDIENT_DETAIL = 'GET_INGREDIENT_DETAIL';
export const DEL_INGREDIENT_DETAIL = 'DEL_INGREDIENT_DETAIL';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';

export function getAllIngredients() {
    return function (dispatch) {
        dispatch({
            type: GET_ALL_INGREDIENTS_REQUEST
        });
        getIngredientsData().then(data => {
            if (data) {
                dispatch({
                    type: GET_ALL_INGREDIENTS_SUCCESS,
                    data: data
                });
            } else {
                dispatch({
                    type: GET_ALL_INGREDIENTS_FAILED
                });
            }
        });
    };
}

export function getOrderDetails(ingredients) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        getOrderDetailsData(ingredients).then(data => {
            if (data) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    data: data
                });
            } else {
                dispatch({
                    type: GET_ORDER_FAILED
                });
            }
        });
    };
}