import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor"
import ModalBlock from "../modal-block/modal-block";
import {getIngredientsData} from "../../utils/api";

function App() {
    const [appState, setAppState] = useState({
        isLoading: false,
        data: null,
    });

    useEffect(() => {
        setAppState({...appState, isLoading: true});
        getIngredientsData().then(data => setAppState({...appState, data: data}))
        .catch(e => console.log(e))
        .finally(setAppState({...appState, isLoading: false}));
    }, []);

    return (
        <div>
            <AppHeader/>
            <main className={styles.main}>
                {
                    !appState.loading && appState.data &&
                    <>
                        <BurgerIngredients ingredients={appState.data}/>
                        <BurgerConstructor ingredients={appState.data}/>
                    </>
                }
            </main>

        </div>
    );
}

export default App;
