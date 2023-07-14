import React, {useEffect, useState} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredients.module.css";
import IngredientBlock from "./ingredient-block/ingredient-block";
import PropTypes from 'prop-types';
import ModalBlock from "../modal-block/modal-block";
import { useInView } from 'react-intersection-observer';
import {useDispatch} from "react-redux";
import {ADD_BUN, GET_INGREDIENT_DETAIL} from "../../services/actions";
import OrderDetails from "../burger-constructor/order-details/order-details";
import IngredientDetails from "./ingredient-details/ingredient-details";

export default function BurgerIngredients () {

    const [current, setCurrent] = React.useState('one');

    const dispatch = useDispatch();

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

    const [modal, setModal] = useState(false)

    const onModalClick = (ingredient) => (event) => {
        dispatch({ type: GET_INGREDIENT_DETAIL, currentIngredient: ingredient})
        setModal(true)
    }

    const onModalClose = () => {
        dispatch({ type: GET_INGREDIENT_DETAIL })
        setModal(false)
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
                modal &&
                <ModalBlock onModalClose={onModalClose}>
                    <IngredientDetails />
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