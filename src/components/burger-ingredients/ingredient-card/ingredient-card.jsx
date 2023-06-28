import React from 'react';
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ingredient-card.module.css";
import PropTypes from "prop-types";
import IngredientDetails from "../../modal-block/modal-body/ingredient-details/ingredient-details";

const IngredientCard = ({onModalClick, ...ingredient}) => {
    return (
        <div className={style.ingredient_card} onClick={onModalClick(<IngredientDetails ingredient={ingredient}/>)}>
            {ingredient.count && <Counter count={ingredient.count} size="default" extraClass="m-1"/>}
            <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name}/>
            <div className={`${style.price} mt-1 mb-1`}>
                <p className="text text_type_digits-default mr-1">{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={`text text_type_main-default mb-8 ${style.ingredient_card}`} >
                {ingredient.name}
            </p>
        </div>
    );
};

IngredientCard.propTypes = {
    ingredient: PropTypes.objectOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        count: PropTypes.number,
    })),
    onModalClick: PropTypes.func
}


export default IngredientCard;