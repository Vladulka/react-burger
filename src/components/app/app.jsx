import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor"
import {useDispatch, useSelector} from "react-redux";
import {ADD_BUN, ADD_INGREDIENT, getAllIngredients} from "../../services/actions";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import { v4 as uuidv4 } from 'uuid';

function App() {

    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(getAllIngredients());
        },
        [dispatch]
    );

    const onDropHandler = (item) => {
        const key = uuidv4();
        if (item.type === "bun") {
            dispatch({ type: ADD_BUN, bun: {...item, itemID: key} })
        } else {
            dispatch({ type: ADD_INGREDIENT, item: {...item, itemID: key} })
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients />
                <BurgerConstructor onDropHandler={onDropHandler} />
            </main>

        </DndProvider>
    );
}

export default App;
