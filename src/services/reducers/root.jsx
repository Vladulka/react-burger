import { combineReducers } from "redux"
import {allIngredientsReducer} from "./all-ingredients";
import {burgerConstructorReducer} from "./burger-constructior";
import {ingredientDetailsReducer} from "./ingredient-details";
import {orderDetailsReducer} from "./order-details";

export const rootReducer = combineReducers({
    allIngredients: allIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer
})