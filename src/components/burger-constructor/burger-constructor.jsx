import React, {useMemo, useState} from 'react';
import style from "./burger-constructor.module.css"
import BurgerConstructorElement from "./burger-constructor-element/burger-constructor-element";
import BurgerConstructorFooter from "./burger-constructor-footer/burger-constructor-footer";
import PropTypes from "prop-types";
import ModalBlock from "../modal-block/modal-block";

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
        <div className={"mt-25"}>
            <div className={style.burger_list_locked}>
                {
                    ingredientsLockedData.map((ingredient, index) =>
                        <BurgerConstructorElement key={index} elementType={'top'} {...ingredient} />
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
                        <BurgerConstructorElement key={index} elementType={'bottom'} {...ingredient} />
                    )
                }
            </div>
            <BurgerConstructorFooter onModalClick={onModalClick} ingredients={ingredients} />
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