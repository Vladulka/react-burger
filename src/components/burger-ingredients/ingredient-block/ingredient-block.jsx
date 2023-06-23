import React from 'react';
import style from "./ingredient-block.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import PropTypes from "prop-types";

const IngredientBlock = ({type, data}) => {
    return (
        <div>
            <p className={`${style.ingredients_subtitle} text text_type_main-default mt-10 mb-6`}>
                { type === "bun" ? "Булка" : type === "sauce" ? "Соусы" : "Начинки" }
            </p>
            <div className={`${style.ingredients} pl-4 pr-4`} >
                {
                    data.filter(el => el.type === type).map((ingredient, index) => <IngredientCard key={index} {...ingredient}/>)
                }
            </div>
        </div>
    );
};

IngredientBlock.propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
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

export default IngredientBlock;