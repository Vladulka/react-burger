import { registrationReducer, initialData } from "./registration";
import { AllInitialTypes } from "../../../types";
import { GET_REGISTER_FAILED, GET_REGISTER_REQUEST, GET_REGISTER_SUCCESS } from "../../actions/registration";
import { authData } from "../../../utils/constants";

describe("Check authorization", () => {
    it("should return initialState", () => {
        expect(registrationReducer(undefined, {} as AllInitialTypes)).toEqual(initialData);
    });
    it("GET_REGISTER_REQUEST", () => {
        const state = registrationReducer(initialData, {
            type: GET_REGISTER_REQUEST,
        });
        expect(state.registerRequest).toBe(true);
    });
    it("GET_REGISTER_SUCCESS", () => {
        const state = registrationReducer(initialData, {
            type: GET_REGISTER_SUCCESS,
            data: authData
        });
        expect(state.registerRequest).toBe(false);
        expect(state.registerFailed).toBe(false);
    });
    it("GET_REGISTER_FAILED", () => {
        const state = registrationReducer(initialData, {
            type: GET_REGISTER_FAILED,
        });
        expect(state.registerRequest).toBe(false);
        expect(state.registerFailed).toBe(true);
    });
});