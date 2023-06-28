import React from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor"
import data from "../../utils/data.js"

function App() {
    return (
        <>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients ingredients={data}/>
                <BurgerConstructor ingredients={data}/>
            </main>
        </>
    );
}

export default App;
