import React, {useContext, useMemo, useState} from 'react';
import style from "./burger-constructor.module.css"
import BurgerConstructorElement from "./burger-constructor-element/burger-constructor-element";
import BurgerConstructorFooter from "./burger-constructor-footer/burger-constructor-footer";
import PropTypes from "prop-types";
import {BurgerContext} from "../../context/BurgerContext";

 const BurgerConstructor = () => {

     const ingredients = useContext(BurgerContext);

     const ingredientsLockedData = useMemo(
         () => {
             return ingredients.filter(ingredient => ingredient.type === "bun")[0];
         },
         [ingredients]
     );

     const ingredientsNotLockedData = useMemo(
         () => {
             return ingredients.filter(ingredient => ingredient.type !== "bun")
         },
         [ingredients]
     );

    return (
        <div className={"mt-25"}>
            <div className={style.burger_list_locked}>
                <BurgerConstructorElement elementType={'top'} isLocked {...ingredientsLockedData} />
            </div>
            <div className={style.burger_list}>
                {
                    ingredientsNotLockedData.map((ingredient, index) =>
                        <BurgerConstructorElement key={index} {...ingredient} />
                    )
                }
            </div>
            <div className={style.burger_list_locked}>
                <BurgerConstructorElement elementType={'bottom'} isLocked {...ingredientsLockedData} />
            </div>
            <BurgerConstructorFooter ingredients={ingredients} />
        </div>
    );
}

BurgerConstructor.propTypes = {
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

export default BurgerConstructor;