import React, {useContext, useMemo} from 'react';
import style from "./ingredient-block.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const IngredientBlock = ({type, onModalClick, lookRef}) => {

    const data = useSelector(store => store.allIngredients.allIngredients);
    const ingredientsRequest = useSelector(store => store.allIngredients.ingredientsRequest);

    const ingredients = useMemo(
        () => {
            return data.filter(el => el.type === type);
        },
        [type, data]
    );

    return (
        <div>
            <p ref={lookRef} className={`${style.ingredients_subtitle} text text_type_main-default mt-10 mb-6`}>
                { type === "bun" ? "Булка" : type === "sauce" ? "Соусы" : "Начинки" }
            </p>
            <div className={`${style.ingredients} pl-4 pr-4`} >
                {
                    !ingredientsRequest && ingredients.map((ingredient, index) => <IngredientCard key={index} onModalClick={onModalClick} card={ingredient}/>)
                }
            </div>
        </div>
    );
};

IngredientBlock.propTypes = {
    type: PropTypes.string.isRequired
}

export default IngredientBlock;