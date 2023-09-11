import { ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rootReducer } from "../services/reducers/root";
import { AllInitialTypes } from "../types";

export type AppDispatch = ThunkDispatch<RootState, unknown, AllInitialTypes>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

export type RootState = ReturnType<typeof rootReducer>;