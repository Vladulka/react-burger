import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor"
import ModalBlock from "../modal-block/modal-block";

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
    const [appState, setAppState] = useState({
        isLoading: false,
        data: null,
    });

    const [modal, setModal] = useState({
        isVisible: false,
        modalBody: null,
    })

    const onModalClick = (body) => (event) => {
        setModal({modalBody: body, isVisible: true})
    }

    const onModalClose = () => {
        setModal({...modal, isVisible: false})
    }

    useEffect(() => {
        setAppState({...appState, isLoading: true});
        fetch(API_URL)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    setAppState({ data: response.data, isLoading: false});
                } else {
                    console.log(response.data);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    return (
        <div>
            <AppHeader/>
            <main className={styles.main}>
                {
                    !appState.loading && appState.data &&
                    <>
                        <BurgerIngredients onModalClick={onModalClick} ingredients={appState.data}/>
                        <BurgerConstructor onModalClick={onModalClick} ingredients={appState.data}/>
                    </>
                }
                {
                    modal.isVisible &&
                    <ModalBlock onModalClose={onModalClose}>
                        {
                            modal.modalBody
                        }
                    </ModalBlock>
                }
            </main>

        </div>
    );
}

export default App;
