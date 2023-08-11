import { combineReducers } from "redux"
import {allIngredientsReducer} from "./all-ingredients";
import {burgerConstructorReducer} from "./burger-constructior";
import {ingredientDetailsReducer} from "./ingredient-details";
import {orderDetailsReducer} from "./order-details";
import {authorizationReducer} from "./authorization";
import {registrationReducer} from "./registration";
import {userReducer} from "./user";

export const rootReducer = combineReducers({
    allIngredients: allIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,

    authData: authorizationReducer,
    registerData: registrationReducer,
    userData: userReducer
})