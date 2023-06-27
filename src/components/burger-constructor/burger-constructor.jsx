import React, {useMemo} from 'react';
import style from "./burger-constructor.module.css"
import BurgerConstructorElement from "./burger-constructor-element/burger-constructor-element";
import BurgerConstructorFooter from "./burger-constructor-footer/burger-constructor-footer";
import PropTypes from "prop-types";

 const BurgerConstructor = ({ingredients}) => {

     const ingredientsLockedData = useMemo(
         () => {
             return ingredients.filter(ingredient => ingredient.type === "bun" && ingredient.isLocked)
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
                {
                    ingredientsLockedData.map((ingredient, index) =>
                        <BurgerConstructorElement key={index} {...ingredient} />
                    )
                }
            </div>
            <div className={style.burger_list}>
                {
                    ingredientsNotLockedData.map((ingredient, index) =>
                        <BurgerConstructorElement key={index} {...ingredient} />
                    )
                }
            </div>
            <div className={style.burger_list_locked}>
                {
                    ingredientsLockedData.map((ingredient, index) =>
                        <BurgerConstructorElement key={index} {...ingredient} />
                    )
                }
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