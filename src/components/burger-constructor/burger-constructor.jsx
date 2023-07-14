import React from 'react';
import style from "./burger-constructor.module.css"
import BurgerConstructorElement from "./burger-constructor-element/burger-constructor-element";
import BurgerConstructorFooter from "./burger-constructor-footer/burger-constructor-footer";
import {useSelector} from "react-redux";
import {useDrop} from "react-dnd";

 const BurgerConstructor = ({onDropHandler}) => {

     const ingredients = useSelector(store => store.burgerConstructor.items);
     const bun = useSelector(store => store.burgerConstructor.bun);

     const [, dropRef] = useDrop({
         accept: 'ingredients',
         drop(item) {
             onDropHandler(item.card)
         }
     });

    return (
        <div className={"mt-25"} ref={dropRef}>
            <div className={style.burger_list_locked}>
                {bun._id && <BurgerConstructorElement elementType={'top'} isLocked {...bun} />}
            </div>
            <div className={style.burger_list}>
                {
                    ingredients && ingredients.map((ingredient, index) =>
                        <BurgerConstructorElement key={ingredient.itemID} index={index} {...ingredient} />
                    )
                }
            </div>
            <div className={style.burger_list_locked}>
                {bun._id && <BurgerConstructorElement elementType={'bottom'} isLocked {...bun} />}
            </div>
            <BurgerConstructorFooter />
        </div>
    );
}

export default BurgerConstructor;