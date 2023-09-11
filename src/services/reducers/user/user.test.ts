import {
    CLEAN_USER_DATA,
    GET_USER_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    SET_CHECK_SUCCESS
} from "../../actions/user";
import { userReducer, initialData } from "./user";
import { AllInitialTypes } from "../../../types";
import { authData } from "../../../utils/constants";

describe("Check user data", () => {
    it("should return initialState", () => {
        expect(userReducer(undefined, {} as AllInitialTypes)).toEqual(initialData);
    });
    it("GET_USER_REQUEST", () => {
        const state = userReducer(initialData, {
            type: GET_USER_REQUEST,
        });
        expect(state.userRequest).toBe(true);
    });
    it("GET_USER_SUCCESS", () => {
        const state = userReducer(initialData, {
            type: GET_USER_SUCCESS,
            data: authData
        });
        expect(state.userRequest).toBe(false);
        expect(state.userFailed).toBe(false);
    });
    it("GET_USER_FAILED", () => {
        const state = userReducer(initialData, {
            type: GET_USER_FAILED,
        });
        expect(state.userRequest).toBe(false);
        expect(state.userFailed).toBe(true);
    });
    it("SET_CHECK_SUCCESS", () => {
        const state = userReducer(initialData, {
            type: SET_CHECK_SUCCESS,
        });
        expect(state.isAuthChecked).toBe(true);
    });
    it("CLEAN_USER_DATA", () => {
        const state = userReducer(initialData, {
            type: CLEAN_USER_DATA,
        });
        expect(state.user).toStrictEqual({
            "email": "",
             "name": "",
        });
    });
});