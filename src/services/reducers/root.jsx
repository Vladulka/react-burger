import { combineReducers } from "redux"
import {allIngredientsReducer} from "./all-ingredients";
import {burgerConstructorReducer} from "./burger-constructior";

export const rootReducer = combineReducers({
    allIngredients: allIngredientsReducer,
    burgerConstructor: burgerConstructorReducer
})