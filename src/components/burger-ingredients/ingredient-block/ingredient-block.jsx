import React, {useContext, useMemo} from 'react';
import style from "./ingredient-block.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import PropTypes from "prop-types";
import {BurgerContext} from "../../../context/BurgerContext";

const IngredientBlock = ({type, onModalClick}) => {

    const data = useContext(BurgerContext);

    const ingredients = useMemo(
        () => {
            return data.filter(el => el.type === type);
        },
        [type, data]
    );

    return (
        <div>
            <p className={`${style.ingredients_subtitle} text text_type_main-default mt-10 mb-6`}>
                { type === "bun" ? "Булка" : type === "sauce" ? "Соусы" : "Начинки" }
            </p>
            <div className={`${style.ingredients} pl-4 pr-4`} >
                {
                    ingredients.map((ingredient, index) => <IngredientCard key={index} onModalClick={onModalClick} {...ingredient}/>)
                }
            </div>
        </div>
    );
};

IngredientBlock.propTypes = {
    type: PropTypes.string.isRequired
}

export default IngredientBlock;