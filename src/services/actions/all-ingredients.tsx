import {getIngredientsData} from "../../utils/api";
import { IIngredient } from "../../types";
import { AppDispatch } from "../../utils/hooks";

export const GET_ALL_INGREDIENTS_REQUEST: 'GET_ALL_INGREDIENTS_REQUEST' = 'GET_ALL_INGREDIENTS_REQUEST';
export const GET_ALL_INGREDIENTS_SUCCESS: 'GET_ALL_INGREDIENTS_SUCCESS' = 'GET_ALL_INGREDIENTS_SUCCESS';
export const GET_ALL_INGREDIENTS_FAILED: 'GET_ALL_INGREDIENTS_FAILED' = 'GET_ALL_INGREDIENTS_FAILED';

interface IGetAllIngredientsRequest {
    readonly type: typeof GET_ALL_INGREDIENTS_REQUEST;
}

interface IGetAllIngredientsSuccess {
    readonly type: typeof GET_ALL_INGREDIENTS_SUCCESS;
    data: Array<IIngredient>
}

interface IGetAllIngredientsFailed {
    readonly type: typeof GET_ALL_INGREDIENTS_FAILED;
}

export type InitialAllIngredientsActionTypes = IGetAllIngredientsRequest
    | IGetAllIngredientsSuccess
    | IGetAllIngredientsFailed;


export function getAllIngredients() {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ALL_INGREDIENTS_REQUEST
        });
        getIngredientsData().then(res => {
            if (res.data) {
                dispatch({
                    type: GET_ALL_INGREDIENTS_SUCCESS,
                    data: res.data
                });
            } else {
                dispatch({
                    type: GET_ALL_INGREDIENTS_FAILED
                });
            }
        })
        .catch((e) => {
            console.log(e)
        });
    };
}