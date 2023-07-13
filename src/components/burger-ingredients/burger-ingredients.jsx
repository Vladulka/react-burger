import React, {useState} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredients.module.css";
import IngredientBlock from "./ingredient-block/ingredient-block";
import PropTypes from 'prop-types';
import ModalBlock from "../modal-block/modal-block";

export default function BurgerIngredients () {

    const [current, setCurrent] = React.useState('one');

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
                {
                    ["bun", "sauce", "main"].map((type, index) => <IngredientBlock key={index} type={type} onModalClick={onModalClick}/>)
                }
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