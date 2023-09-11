import {combineReducers} from "redux"
import {allIngredientsReducer} from "./all-ingredients";
import {burgerConstructorReducer} from "./burger-constructior";
import {ingredientDetailsReducer} from "./ingredient-details";
import {orderDetailsReducer} from "./order-details";
import {authorizationReducer} from "./authorization";
import {registrationReducer} from "./registration";
import {userReducer} from "./user";
import {orderHistoryReducer} from "./order-list";
import {configureStore, MiddlewareArray} from "@reduxjs/toolkit";
import {socketOrdersMiddleware} from "../middlewares/web-middleware";
import thunk from "redux-thunk";
import {webSocket} from "../actions/web-socket";
import { orderInfoReducer } from "./order-info";

export const rootReducer = combineReducers({
    allIngredients: allIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,

    authData: authorizationReducer,
    registerData: registrationReducer,
    userData: userReducer,
    orderHistoryDetails: orderHistoryReducer,
    orderInfo: orderInfoReducer

});

export const store = configureStore({
    reducer: rootReducer,
    middleware: new MiddlewareArray().concat(thunk, socketOrdersMiddleware(webSocket))
});