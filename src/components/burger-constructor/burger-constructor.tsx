import React from 'react';
import style from "./burger-constructor.module.css"
import BurgerConstructorElement from "./burger-constructor-element/burger-constructor-element";
import BurgerConstructorFooter from "./burger-constructor-footer/burger-constructor-footer";
import {useSelector} from "react-redux";
import { useDrop } from "react-dnd";
import { IDragItem, IIngredient } from "../../types";

const BurgerConstructor = ({onDropHandler}: {onDropHandler: (item: IIngredient) => void}) => {

     const ingredients = useSelector((store: any) => store.burgerConstructor.items);
     const bun = useSelector((store: any) => store.burgerConstructor.bun);

     const [, dropRef] = useDrop({
         accept: 'ingredients',
         drop(item: IDragItem ) {
             onDropHandler(item.data)
         }
     });

    return (
        <div className={"mt-25"} ref={dropRef}>
            <div className={style.burger_list_locked}>
                {bun._id && <BurgerConstructorElement elementType={'top'} isLocked {...bun} name={bun.name + ' (верх)'}/>}
            </div>
            <div className={style.burger_list}>
                {
                    ingredients && ingredients.map((ingredient: IIngredient, index: number) =>
                        <BurgerConstructorElement key={ingredient.itemID} index={index} {...ingredient} />
                    )
                }
            </div>
            <div className={style.burger_list_locked}>
                {bun._id && <BurgerConstructorElement elementType={'bottom'} isLocked {...bun} name={bun.name + ' (низ)'} />}
            </div>
            <BurgerConstructorFooter />
        </div>
    );
}

export default BurgerConstructor;