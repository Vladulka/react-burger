import React from 'react';
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { ADD_BUN, ADD_INGREDIENT } from "../services/actions/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IIngredient } from "../types";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";

const MainPage = () => {

    const dispatch = useDispatch();

    const onDropHandler = (item: IIngredient) => {
        const key = uuidv4();
        if (item.type === "bun") {
            dispatch({ type: ADD_BUN, bun: {...item, itemID: key} })
        } else {
            dispatch({ type: ADD_INGREDIENT, item: {...item, itemID: key} })
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor onDropHandler={onDropHandler} />
        </DndProvider>
    );
};

export default MainPage;