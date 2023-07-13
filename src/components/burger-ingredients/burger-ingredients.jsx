import React, {useEffect, useState} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredients.module.css";
import IngredientBlock from "./ingredient-block/ingredient-block";
import PropTypes from 'prop-types';
import ModalBlock from "../modal-block/modal-block";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import { useInView } from 'react-intersection-observer';

export default function BurgerIngredients () {

    const [current, setCurrent] = React.useState('one');

    const { ref: refBun, inView: inViewBun } = useInView({
        threshold: 0
    });
    const { ref: refSauce, inView: inViewSauce } = useInView({
        threshold: 0
    });
    const { ref: refMain, inView: inViewMain } = useInView({
        threshold: 0
    });

    useEffect(() => {
        if (inViewBun) {
            setCurrent('one');
        } else if (inViewSauce) {
            setCurrent('two');
        } else if (inViewMain) {
            setCurrent('three');
        }
    }, [inViewBun, inViewSauce, inViewMain])

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

    return (
        <div>
            <p className="text text_type_main-large mt-10 mb-5">
                Собери свой бургер
            </p>
            <div className={style.tab_block}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={style.ingredients_block}>
                <IngredientBlock type={"bun"} lookRef={refBun} onModalClick={onModalClick}/>
                <IngredientBlock type={"sauce"} lookRef={refSauce} onModalClick={onModalClick}/>
                <IngredientBlock type={"main"} lookRef={refMain} onModalClick={onModalClick}/>
            </div>
            {
                modal.isVisible &&
                <ModalBlock onModalClose={onModalClose}>
                    {
                        modal.modalBody
                    }
                </ModalBlock>
            }
        </div>
    );
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
    })).isRequired,
}